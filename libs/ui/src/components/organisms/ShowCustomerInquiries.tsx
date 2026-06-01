import {
  InquiryStatus,
  InquiriesForCustomerDocument,
} from '@mockp/network/src/gql/generated';
import { useTakeSkip } from '@mockp/util/hooks/pagination';
import { useQuery } from '@apollo/client';
import { ShowData } from './ShowData';
import { CustomerInquiryCard } from './CustomerInquiryCard';

export const ShowCustomerInquiries = ({
  statuses,
}: {
  statuses: InquiryStatus[];
}) => {
  const { setSkip, setTake, skip, take } = useTakeSkip();

  const { loading, data, error } = useQuery(InquiriesForCustomerDocument, {
    variables: {
      skip,
      take,
      where: {
        status: {
          in: statuses,
        },
      },
    },
  });

  return (
    <ShowData
      error={error?.message}
      loading={loading}
      pagination={{
        skip,
        take,
        resultCount: data?.inquiriesForCustomer.length || 0,
        totalCount: data?.inquiriesCount.count || 0,
        setSkip,
        setTake,
      }}
    >
      {data?.inquiriesForCustomer.map((inquiry) => (
        <CustomerInquiryCard key={inquiry.id} inquiry={inquiry} />
      ))}
    </ShowData>
  );
};
