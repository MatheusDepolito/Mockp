import {
  PropertiesDocument,
  MyBrokerageQuery,
} from '@mockp/network/src/gql/generated';
import { useTakeSkip } from '@mockp/util/hooks/pagination';
import { useQuery } from '@apollo/client';
import { ShowData } from './ShowData';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { PropertyCard } from './PropertyCard';

export const ListProperties = ({
  brokerageId,
}: {
  brokerageId: MyBrokerageQuery['myBrokerage']['id'];
}) => {
  const { setSkip, setTake, skip, take } = useTakeSkip();
  const { data, loading, error } = useQuery(PropertiesDocument, {
    variables: {
      skip,
      take,
      where: { brokerageId: { equals: brokerageId } },
    },
  });

  return (
    <ShowData
      error={error?.message}
      loading={loading}
      pagination={{
        skip,
        take,
        resultCount: data?.properties.length,
        totalCount: data?.propertiesCount.count,
        setSkip,
        setTake,
      }}
      childrenClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3"
      title={
        <div className="flex items-center gap-4">
          <div>Imóveis</div>
          <Link
            href="/new-property"
            className="rounded-full border border-black p-0.5"
          >
            <IconPlus />
          </Link>
        </div>
      }
    >
      {data?.properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </ShowData>
  );
};
