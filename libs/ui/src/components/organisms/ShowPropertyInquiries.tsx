import {
  InquiryStatus,
  InquiriesForPropertyDocument,
  QueryMode,
} from '@mockp/network/src/gql/generated';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useTakeSkip } from '@mockp/util/hooks/pagination';
import { ShowData } from './ShowData';
import { ManageInquiryCard } from './ManageInquiryCard';

export const ShowPropertyInquiries = ({
  propertyId,
  statuses,
}: {
  propertyId: number;
  statuses: InquiryStatus[];
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { take, setTake, skip, setSkip } = useTakeSkip();

  const { data, loading, error } = useQuery(InquiriesForPropertyDocument, {
    variables: {
      skip,
      take,
      where: {
        status: { in: statuses },
        propertyId: { equals: propertyId },
        ...(searchTerm && {
          contactNotes: {
            contains: searchTerm,
            mode: QueryMode.Insensitive,
          },
        }),
      },
    },
  });

  return (
    <div className="mt-4">
      <div className="flex justify-center">
        <div className="flex justify-start items-center gap-2 w-full max-w-xl  rounded-full shadow-xl bg-white px-4">
          <IconSearch />
          <input
            placeholder="Buscar observações"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow py-4 bg-transparent"
          />
        </div>
      </div>
      <ShowData
        loading={loading}
        error={error?.message}
        pagination={{
          skip,
          take,
          resultCount: data?.inquiriesForProperty.length,
          totalCount: data?.inquiriesCount.count,
          setSkip,
          setTake,
        }}
      >
        {data?.inquiriesForProperty.map((inquiry) => (
          <ManageInquiryCard key={inquiry.id} inquiry={inquiry} />
        ))}
      </ShowData>
    </div>
  );
};
