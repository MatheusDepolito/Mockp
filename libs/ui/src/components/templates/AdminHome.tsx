'use client';
import { useTakeSkip } from '@mockp/util/hooks/pagination';
import { useQuery } from '@apollo/client';
import { PropertiesDocument } from '@mockp/network/src/gql/generated';
import { ShowData } from '../organisms/ShowData';
import { PropertyAdminCard } from '../organisms/PropertyAdminCard';
import { CreateVerificationButton } from '../organisms/admin/CreateVerificationButton';
import { RemoveVerificationButton } from '../organisms/admin/RemoveVerificationButton';

export const AdminHome = () => {
  return <ShowProperties />;
};

export const ShowProperties = () => {
  const { setSkip, setTake, skip, take } = useTakeSkip();
  const { loading, data, error } = useQuery(PropertiesDocument, {
    variables: { skip, take },
  });

  return (
    <ShowData
      error={error?.message}
      title="Imóveis"
      loading={loading}
      pagination={{
        resultCount: data?.properties.length || 0,
        totalCount: data?.propertiesCount.count || 0,
        setSkip,
        setTake,
        skip,
        take,
      }}
    >
      {data?.properties.map((property) => (
        <PropertyAdminCard key={property.id} property={property}>
          <div className="flex justify-end">
            {!property?.verification?.verified ? (
              <CreateVerificationButton propertyId={property.id} />
            ) : (
              <RemoveVerificationButton propertyId={property.id} />
            )}
          </div>
        </PropertyAdminCard>
      ))}
    </ShowData>
  );
};
