import { useEffect, useState } from 'react';
import { FormTypeSearchProperty } from '../searchProperties';
import { SearchPropertiesQueryVariables } from '@mockp/network/src/gql/generated';
import {
  FieldNamesMarkedBoolean,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { useDebounce } from '@mockp/util/hooks/async';
import { intFilter } from './util';

type FormData = Partial<
  Pick<
    FormTypeSearchProperty,
    | 'endTime'
    | 'startTime'
    | 'listPrice'
    | 'types'
    | 'locationFilter'
    | 'skip'
    | 'take'
  >
>;

export const useConvertSearchFormToVariables = () => {
  const [variables, setVariables] =
    useState<SearchPropertiesQueryVariables | null>(null);

  const {
    formState: { dirtyFields, errors },
  } = useFormContext<FormTypeSearchProperty>();

  const formData = useWatch<FormTypeSearchProperty>();

  const [debouncedFormData, { debouncing }] = useDebounce(formData, 300);

  const hasErrors = Object.keys(errors).length !== 0;

  useEffect(() => {
    const {
      endTime = '',
      startTime = '',
      locationFilter,
      listPrice,
      types,
      skip,
      take,
    } = debouncedFormData;

    if (!startTime || !endTime || !locationFilter) {
      return;
    }

    const dateFilter: SearchPropertiesQueryVariables['dateFilter'] = {
      start: startTime,
      end: endTime,
    };

    const { ne_lat = 0, ne_lng = 0, sw_lat = 0, sw_lng = 0 } = locationFilter;

    const featuresFilter = createPropertyFeaturesFilter(dirtyFields, {
      types,
    });

    const propertyFilter = createPropertyFilter(dirtyFields, {
      listPrice,
      skip,
      take,
    });

    setVariables({
      dateFilter,
      locationFilter: { ne_lat, ne_lng, sw_lat, sw_lng },
      ...(Object.keys(featuresFilter).length && { featuresFilter }),
      ...(Object.keys(propertyFilter).length && { propertyFilter }),
    });
  }, [debouncedFormData, dirtyFields]);

  return { variables: hasErrors ? null : variables, debouncing };
};

export const createPropertyFeaturesFilter = (
  dirtyFields: FieldNamesMarkedBoolean<FormTypeSearchProperty>,
  formData: Pick<FormData, 'types'>,
) => {
  const type = dirtyFields.types && { in: formData.types };

  return {
    ...(type && { type }),
  };
};

export const createPropertyFilter = (
  dirtyFields: FieldNamesMarkedBoolean<FormTypeSearchProperty>,
  formData: Pick<FormData, 'listPrice' | 'skip' | 'take'>,
) => {
  const listPrice = dirtyFields.listPrice && intFilter(formData.listPrice);
  const skip = (dirtyFields.skip && formData.skip) || 0;
  const take = (dirtyFields.take && formData.take) || 10;

  return {
    ...(listPrice && { where: { listPrice } }),
    ...(skip && { skip }),
    ...(take && { take }),
  };
};
