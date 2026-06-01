import { useMutation } from '@apollo/client';
import {
  CreateVerificationDocument,
  namedOperations,
} from '@mockp/network/src/gql/generated';
import { Button } from '../../atoms/Button';

export const CreateVerificationButton = ({
  propertyId,
}: {
  propertyId: number;
}) => {
  const [createVerification, { loading }] = useMutation(
    CreateVerificationDocument,
    {
      awaitRefetchQueries: true,
      refetchQueries: [namedOperations.Query.Properties],
    },
  );

  return (
    <Button
      size="none"
      variant="text"
      loading={loading}
      className="font-semibold underline underline-offset-4"
      onClick={async () => {
        await createVerification({
          variables: {
            createVerificationInput: {
              propertyId,
              verified: true,
            },
          },
        });
      }}
    >
      Verify
    </Button>
  );
};
