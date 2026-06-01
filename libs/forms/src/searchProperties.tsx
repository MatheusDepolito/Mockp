'use client';
import { PropertyFeatureType } from '@mockp/network/src/gql/generated';
import { z } from 'zod';
import { toLocalISOString } from '@mockp/util/date';
import { ReactNode } from 'react';
import { DefaultValues, useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isEndTimeValid, isStartTimeValid } from './util';

const minMaxTuple = z.tuple([z.number(), z.number()]);

export const formSchemaSearchProperty = z
  .object({
    startTime: z.string(),
    endTime: z.string(),

    locationFilter: z.object({
      ne_lat: z.number(),
      ne_lng: z.number(),
      sw_lat: z.number(),
      sw_lng: z.number(),
    }),

    types: z.nativeEnum(PropertyFeatureType).array(),

    listPrice: minMaxTuple.optional(),

    skip: z.number().optional(),
    take: z.number().optional(),
  })
  .refine(({ startTime }) => isStartTimeValid(startTime), {
    message: 'Start time should be greater than current time',
    path: ['startTime'],
  })
  .refine(({ endTime, startTime }) => isEndTimeValid({ endTime, startTime }), {
    message: 'End time should be greater than start time',
    path: ['endTime'],
  });

export type FormTypeSearchProperty = z.infer<typeof formSchemaSearchProperty>;

export const getCurrentTimeAndOneHourLater = () => {
  const startTime = new Date();
  startTime.setMinutes(startTime.getMinutes() + 5);

  const endTime = new Date(startTime);
  endTime.setHours(endTime.getHours() + 1);

  return {
    startTime: toLocalISOString(startTime).slice(0, 16),
    endTime: toLocalISOString(endTime).slice(0, 16),
  };
};

export const AllPropertyFeatureTypes = [
  PropertyFeatureType.Bedroom,
  PropertyFeatureType.Bathroom,
  PropertyFeatureType.ParkingSpot,
  PropertyFeatureType.AirConditioner,
  PropertyFeatureType.BuiltInWardrobe,
  PropertyFeatureType.FurnishedKitchen,
  PropertyFeatureType.Other,
];

export const formDefaultValuesSearchProperties: DefaultValues<FormTypeSearchProperty> =
  {
    listPrice: [0, 5000],
    types: AllPropertyFeatureTypes.sort(),
  };

export const FormProviderSearchProperty = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { startTime, endTime } = getCurrentTimeAndOneHourLater();
  const methods = useForm<FormTypeSearchProperty>({
    resolver: zodResolver(formSchemaSearchProperty),
    defaultValues: {
      ...formDefaultValuesSearchProperties,
      startTime,
      endTime,
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};
