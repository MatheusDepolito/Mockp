'use client';
import { useFormCreateBrokerage } from '@mockp/forms/src/createBrokerage';
import { useEffect, useState } from 'react';
import { Button } from '../atoms/Button';
import { Dialog } from '../atoms/Dialog';
import { Form } from '../atoms/Form';
import { HtmlLabel } from '../atoms/HtmlLabel';
import { HtmlInput } from '../atoms/HtmlInput';
import { HtmlTextArea } from '../atoms/HtmlTextArea';
import { useSession } from 'next-auth/react';
import { useMutation } from '@apollo/client';
import {
  CreateBrokerageDocument,
  namedOperations,
} from '@mockp/network/src/gql/generated';
export const CreateBrokerage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useFormCreateBrokerage();

  const session = useSession();
  const uid = session.data?.user?.uid;
  const managerName = session.data?.user?.name;

  const [createBrokerage, { loading, data }] = useMutation(
    CreateBrokerageDocument,
  );

  useEffect(() => {
    if (uid) {
      setValue('brokerageManagerId', uid);
    }
    if (managerName) {
      setValue('managerName', managerName);
    }
  }, [uid, managerName, setValue]);

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Create Brokerage</Button>
      <Dialog open={open} setOpen={setOpen} title="Create Brokerage">
        <Form
          onSubmit={handleSubmit(async (data) => {
            await createBrokerage({
              variables: {
                createBrokerageInput: data,
              },
              awaitRefetchQueries: true,
              refetchQueries: [namedOperations.Query.myBrokerage],
            });
          })}
        >
          <HtmlLabel title="Brokerage name" error={errors.displayName?.message}>
            <HtmlInput
              placeholder="Brokerage name"
              {...register('displayName')}
            />
          </HtmlLabel>
          <HtmlLabel title="Description" error={errors.description?.message}>
            <HtmlTextArea
              placeholder="Describe your parking company"
              {...register('description')}
            />
          </HtmlLabel>
          <HtmlLabel
            title="BrokerageManager ID"
            error={errors.brokerageManagerId?.message}
          >
            <HtmlInput
              placeholder="BrokerageManager ID"
              {...register('brokerageManagerId')}
              readOnly
            />
          </HtmlLabel>
          <HtmlLabel
            title="BrokerageManager name"
            error={errors.managerName?.message}
          >
            <HtmlInput
              placeholder="BrokerageManager name"
              {...register('managerName')}
              readOnly
            />
          </HtmlLabel>
          <Button loading={loading} type="submit">
            Submit
          </Button>
        </Form>
      </Dialog>
    </div>
  );
};
