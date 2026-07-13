import { useMutation } from '@apollo/client';
import {
  UpdateAgentDocument,
  namedOperations,
} from '@mockp/network/src/gql/generated';
import { Button } from '../../atoms/Button';
import { useI18n } from '@mockp/util/i18n';

export const VerifyAgentButton = ({
  uid,
  verified,
}: {
  uid: string;
  verified: boolean;
}) => {
  const { t } = useI18n();
  const [updateAgent, { loading }] = useMutation(UpdateAgentDocument, {
    awaitRefetchQueries: true,
    refetchQueries: [namedOperations.Query.AdminAgents],
  });

  return (
    <Button
      size="none"
      variant="text"
      loading={loading}
      className="font-semibold underline underline-offset-4"
      onClick={async () => {
        await updateAgent({
          variables: {
            updateAgentInput: { uid, verified: !verified },
          },
        });
      }}
    >
      {verified
        ? t('adminVerifications.revokeAgent')
        : t('adminVerifications.verifyAgent')}
    </Button>
  );
};
