import { useMutation } from '@apollo/client';
import {
  RemoveVerificationDocument,
  namedOperations,
} from '@mockp/network/src/gql/generated';
import { Button } from '../../atoms/Button';

export const RemoveVerificationButton = ({
  propertyId,
}: {
  propertyId: number;
}) => {
  const [removeVerification, { loading }] = useMutation(
    RemoveVerificationDocument,
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
      className="font-semibold"
      onClick={async () => {
        await removeVerification({
          variables: {
            where: {
              propertyId,
            },
          },
        });
      }}
    >
      Unlist
    </Button>
  );
};
