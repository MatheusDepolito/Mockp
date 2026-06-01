import { useFormCreateManyPropertyFeatures } from '@mockp/forms/src/createPropertyFeatures';
import { useMutation } from '@apollo/client';
import {
  CreatePropertyFeatureDocument,
  PropertyFeatureType,
  namedOperations,
} from '@mockp/network/src/gql/generated';
import { useState } from 'react';
import { Button } from '../atoms/Button';
import { Dialog } from '../atoms/Dialog';
import { HtmlLabel } from '../atoms/HtmlLabel';
import { HtmlSelect } from '../atoms/HtmlSelect';
import { HtmlInput } from '../atoms/HtmlInput';
import { Form } from '../atoms/Form';
import { toast } from '../molecules/Toast';

export const CreateManyPropertyFeaturesDialog = ({
  propertyId,
}: {
  propertyId: number;
}) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormCreateManyPropertyFeatures();

  const [createPropertyFeature, { loading }] = useMutation(
    CreatePropertyFeatureDocument,
    {
      awaitRefetchQueries: true,
      refetchQueries: [namedOperations.Query.Properties],
      onCompleted() {
        setOpen(false);
        reset();
        toast('Característica adicionada com sucesso.');
      },
      onError() {
        toast('Action failed.');
      },
    },
  );

  return (
    <>
      <Button
        variant="text"
        size="none"
        onClick={() => setOpen(true)}
        className="w-16 h-10 border-2 group border-primary"
      >
        <div className="transition-transform duration-300 group-hover:scale-150">
          +
        </div>
      </Button>
      <Dialog open={open} setOpen={setOpen} title={'Adicionar característica'}>
        <Form
          onSubmit={handleSubmit(async (data) => {
            await createPropertyFeature({
              variables: {
                createPropertyFeatureInput: {
                  ...data,
                  propertyId,
                },
              },
            });
          })}
        >
          <div className="grid grid-cols-2 gap-2">
            <HtmlLabel title="Tipo" error={errors.type?.toString()}>
              <HtmlSelect placeholder="Tipo" {...register(`type`)}>
                {Object.values(PropertyFeatureType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </HtmlSelect>
            </HtmlLabel>
            <HtmlLabel title="Quantidade" error={errors.quantity?.message}>
              <HtmlInput
                type="number"
                placeholder="Quantidade"
                {...register(`quantity`, {
                  valueAsNumber: true,
                })}
              />
            </HtmlLabel>
            <HtmlLabel title="Nome (opcional)" optional>
              <HtmlInput
                placeholder="Nome opcional"
                {...register(`displayName`)}
              />
            </HtmlLabel>
            <Button type="submit" loading={loading}>
              Submit
            </Button>
          </div>
        </Form>
      </Dialog>
    </>
  );
};
