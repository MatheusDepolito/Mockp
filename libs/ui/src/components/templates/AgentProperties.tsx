'use client';
import { MyPropertiesAsAgentDocument } from '@mockp/network/src/gql/generated';
import { useTakeSkip } from '@mockp/util/hooks/pagination';
import { useQuery } from '@apollo/client';
import { ShowData } from '../organisms/ShowData';
import { PropertyCard } from '../organisms/PropertyCard';

export const AgentProperties = () => {
  const { setSkip, setTake, skip, take } = useTakeSkip();
  const { data, loading, error } = useQuery(MyPropertiesAsAgentDocument, {
    variables: { skip, take },
  });

  return (
    <ShowData
      error={error?.message}
      loading={loading}
      pagination={{
        skip,
        take,
        resultCount: data?.myPropertiesAsAgent.length,
        totalCount: data?.myPropertiesAsAgentCount.count,
        setSkip,
        setTake,
      }}
      childrenClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3"
      title="Meus imóveis"
    >
      {data?.myPropertiesAsAgent.length === 0 && !loading ? (
        <p className="text-sm text-gray-500 col-span-full">
          Nenhum imóvel vinculado a você como corretor responsável.
        </p>
      ) : null}
      {data?.myPropertiesAsAgent.map((property) => (
        <PropertyCard key={property.id} property={property} hideInquiriesLink />
      ))}
    </ShowData>
  );
};
