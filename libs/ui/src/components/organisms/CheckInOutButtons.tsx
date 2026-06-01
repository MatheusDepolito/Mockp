import {
  InquiryStatus,
  CreateInquiryTimelineDocument,
  namedOperations,
} from '@mockp/network/src/gql/generated';
import { useMutation } from '@apollo/client';
import { Button } from '../atoms/Button';

export const CheckInOutButton = ({
  inquiryId,
  buttonText,
  status,
}: {
  inquiryId: number;
  status: InquiryStatus;
  buttonText: string;
}) => {
  const [checkIn, { data, loading }] = useMutation(
    CreateInquiryTimelineDocument,
  );
  return (
    <Button
      loading={loading}
      onClick={() => {
        checkIn({
          variables: {
            createInquiryTimelineInput: {
              inquiryId,
              status,
            },
          },
          awaitRefetchQueries: true,
          refetchQueries: [namedOperations.Query.InquiriesForProperty],
        });
      }}
      color="white"
      className="mt-1"
      fullWidth
    >
      {buttonText}
    </Button>
  );
};
