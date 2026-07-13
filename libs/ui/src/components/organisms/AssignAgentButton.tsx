import {
  AssignAgentDocument,
  InquiryStatus,
  namedOperations,
} from '@mockp/network/src/gql/generated';
import { ReactNode } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from '../molecules/Toast';
import { Button } from '../atoms/Button';

export const AssignAgentButton = ({
  inquiryId,
  status,
  children,
}: {
  inquiryId: number;
  status: InquiryStatus;
  children: ReactNode;
}) => {
  const [assignPickup, { loading }] = useMutation(AssignAgentDocument, {
    awaitRefetchQueries: true,
    refetchQueries: [
      namedOperations.Query.AgentDrops,
      namedOperations.Query.AgentPickups,
      namedOperations.Query.myDropTrips,
      namedOperations.Query.myPickupTrips,
    ],
    onCompleted(data) {
      toast(`Action successful.
            ID: ${data.assignAgent.id}`);
    },
  });

  return (
    <Button
      loading={loading}
      variant="outlined"
      fullWidth
      onClick={async () => {
        await assignPickup({
          variables: { inquiryId, status },
        });
      }}
    >
      {children}
    </Button>
  );
};
