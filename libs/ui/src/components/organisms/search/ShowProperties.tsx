import { useLazyQuery } from '@apollo/client';
import { SearchPropertiesDocument } from '@mockp/network/src/gql/generated';
import { useEffect } from 'react';
import { PropertyMarker } from './PropertyMarker';
import { useConvertSearchFormToVariables } from '@mockp/forms/src/adapters/searchFormAdapter';
import { Panel } from '../map/Panel';
import { Loader } from '../../molecules/Loader';
import { IconInfoCircle } from '@tabler/icons-react';

export const ShowProperties = () => {
  const [
    searchProperties,
    { loading: propertiesLoading, data, previousData, error },
  ] = useLazyQuery(SearchPropertiesDocument);

  const { variables, debouncing } = useConvertSearchFormToVariables();
  useEffect(() => {
    if (variables) searchProperties({ variables });
  }, [variables, searchProperties]);

  const properties =
    data?.searchProperties || previousData?.searchProperties || [];
  const loading = debouncing || propertiesLoading;

  if (error) {
    return (
      <Panel
        position="center-center"
        className="bg-white/50 shadow border-white border backdrop-blur-sm"
      >
        <div className="flex items-center justify-center gap-2 ">
          <IconInfoCircle /> <div>{error.message}</div>
        </div>
      </Panel>
    );
  }

  if (!loading && properties.length === 0) {
    return (
      <Panel
        position="center-center"
        className="bg-white/50 shadow border-white border backdrop-blur-sm"
      >
        <div className="flex items-center justify-center gap-2">
          <IconInfoCircle /> <div>Nenhum imóvel encontrado nesta área.</div>
        </div>
      </Panel>
    );
  }

  return (
    <>
      {loading ? (
        <Panel position="center-bottom">
          <Loader />
        </Panel>
      ) : null}
      {properties.map((property) => (
        <PropertyMarker key={property.id} marker={property} />
      ))}
    </>
  );
};
