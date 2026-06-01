import { useFormCreateAgent } from '@mockp/forms/src/createAgent';
import { useState } from 'react';
import { Button } from '../atoms/Button';
import { Dialog } from '../atoms/Dialog';
import { Form } from '../atoms/Form';
import { ImagePreview } from './ImagePreview';
import { Controller } from 'react-hook-form';
import { HtmlInput } from '../atoms/HtmlInput';
import { HtmlLabel } from '../atoms/HtmlLabel';
import { useCloudinaryUpload } from '@mockp/util/hooks/cloudinary';
import { useMutation } from '@apollo/client';
import {
  CreateAgentDocument,
  namedOperations,
} from '@mockp/network/src/gql/generated';
import { toast } from '../molecules/Toast';

type CreatedAgentCredentials = {
  email: string;
  temporaryPassword: string;
  displayName: string;
};

export const AddAgent = () => {
  const {
    register,
    resetField,
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useFormCreateAgent();
  const [open, setOpen] = useState(false);
  const [credentials, setCredentials] =
    useState<CreatedAgentCredentials | null>(null);
  const { image } = watch();

  const [createAgent, { loading }] = useMutation(CreateAgentDocument, {
    awaitRefetchQueries: true,
    refetchQueries: [namedOperations.Query.companyAgents],
  });

  const { uploading, upload } = useCloudinaryUpload();

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Cadastrar corretor</Button>
      <Dialog
        widthClassName="max-w-xl"
        open={open}
        setOpen={setOpen}
        title="Cadastrar corretor"
      >
        <Form
          onSubmit={handleSubmit(async ({ image, ...data }) => {
            try {
              const images = await upload(image);
              const result = await createAgent({
                variables: {
                  createAgentInput: { ...data, image: images[0] },
                },
              });
              const payload = result.data?.createAgent;
              if (payload) {
                reset();
                setOpen(false);
                setCredentials({
                  email: payload.email,
                  temporaryPassword: payload.temporaryPassword,
                  displayName: payload.agent.displayName,
                });
              }
            } catch (error) {
              const message =
                error instanceof Error
                  ? error.message
                  : 'Falha ao criar corretor.';
              toast(message);
            }
          })}
        >
          <HtmlLabel title="E-mail" error={errors.email?.message}>
            <HtmlInput
              type="email"
              placeholder="corretor@exemplo.com"
              {...register('email')}
            />
          </HtmlLabel>
          <HtmlLabel title="Nome" error={errors.displayName?.message}>
            <HtmlInput
              placeholder="Nome do corretor"
              {...register('displayName')}
            />
          </HtmlLabel>
          <HtmlLabel title="CRECI / Licença" error={errors.licenseID?.message}>
            <HtmlInput
              placeholder="Número do CRECI"
              {...register('licenseID')}
            />
          </HtmlLabel>
          <ImagePreview srcs={image} clearImage={() => resetField('image')}>
            <Controller
              control={control}
              name={`image`}
              render={({ field }) => (
                <HtmlInput
                  type="file"
                  accept="image/*"
                  multiple={false}
                  onChange={(e) => field.onChange(e?.target?.files)}
                />
              )}
            />
          </ImagePreview>
          <Button loading={uploading || loading} type="submit">
            Criar corretor
          </Button>
        </Form>
      </Dialog>

      <Dialog
        widthClassName="max-w-md"
        open={!!credentials}
        setOpen={(value) => {
          if (!value) setCredentials(null);
        }}
        title="Corretor criado"
      >
        {credentials ? (
          <div className="space-y-4 text-sm">
            <p>
              <strong>{credentials.displayName}</strong> foi cadastrado com
              sucesso. Repasse as credenciais abaixo ao corretor para o primeiro
              acesso.
            </p>
            <div className="rounded border border-gray-200 bg-gray-50 p-3 space-y-2">
              <div>
                <span className="text-gray-500">E-mail: </span>
                <span className="font-mono">{credentials.email}</span>
              </div>
              <div>
                <span className="text-gray-500">Senha temporária: </span>
                <span className="font-mono font-semibold">
                  {credentials.temporaryPassword}
                </span>
              </div>
            </div>
            <p className="text-xs text-red-600">
              Copie agora — a senha não será exibida novamente.
            </p>
            <Button fullWidth onClick={() => setCredentials(null)}>
              Entendi
            </Button>
          </div>
        ) : null}
      </Dialog>
    </div>
  );
};
