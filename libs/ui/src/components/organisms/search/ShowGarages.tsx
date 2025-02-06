import { useLazyQuery } from '@apollo/client';
import { SearchGaragesDocument } from '@mockp/network/src/gql/generated';
import { useEffect } from 'react';
import { GarageMarker } from './GarageMarker';
import { useConvertSearchFormToVariables } from '@mockp/forms/src/adapters/searchFormAdapter';

export const ShowGarages = () => {
  const [searchGarages, { loading, data, error }] = useLazyQuery(
    SearchGaragesDocument,
  );

  const { debouncing, variables } = useConvertSearchFormToVariables();
  //const { endTime: end, startTime: start, locationFilter } = ();
  useEffect(() => {
    if (variables) searchGarages({ variables });
  }, [searchGarages, variables]);

  return (
    <>
      {data?.searchGarages.map((garage) => (
        <GarageMarker key={garage.id} marker={garage} />
      ))}
    </>
  );
};
