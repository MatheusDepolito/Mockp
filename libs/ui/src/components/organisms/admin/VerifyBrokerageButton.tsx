import { useMutation } from '@apollo/client';
import {
  UpdateBrokerageDocument,
  namedOperations,
} from '@mockp/network/src/gql/generated';
import { Button } from '../../atoms/Button';
import { useI18n } from '@mockp/util/i18n';

export const VerifyBrokerageButton = ({
  id,
  verified,
}: {
  id: number;
  verified: boolean;
}) => {
  const { t } = useI18n();
  const [updateBrokerage, { loading }] = useMutation(UpdateBrokerageDocument, {
    awaitRefetchQueries: true,
    refetchQueries: [namedOperations.Query.AdminBrokerages],
  });

  return (
    <Button
      size="none"
      variant="text"
      loading={loading}
      className="font-semibold underline underline-offset-4"
      onClick={async () => {
        await updateBrokerage({
          variables: {
            updateBrokerageInput: { id, verified: !verified },
          },
        });
      }}
    >
      {verified
        ? t('adminVerifications.revokeBrokerage')
        : t('adminVerifications.verifyBrokerage')}
    </Button>
  );
};
