'use client';
import { useFormRegisterSoloAgent } from '@mockp/forms/src/registerSoloAgent';
import { useMutation } from '@apollo/client';
import { RegisterSoloAgentDocument } from '@mockp/network/src/gql/generated';
import { agentAppUrl } from '@mockp/util/appUrls';
import { useCloudinaryUpload } from '@mockp/util/hooks/cloudinary';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Controller } from 'react-hook-form';
import { Button } from '../atoms/Button';
import { Form } from '../atoms/Form';
import { HtmlInput } from '../atoms/HtmlInput';
import { HtmlLabel } from '../atoms/HtmlLabel';
import { ImagePreview } from '../organisms/ImagePreview';
import { toast } from '../molecules/Toast';
import { getApiErrorMessage, useI18n } from '@mockp/util/i18n';

export const RegisterSoloAgentForm = () => {
  const { locale, t } = useI18n();
  const {
    register,
    resetField,
    control,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useFormRegisterSoloAgent(locale);
  const { image } = watch();

  const [registerSoloAgent, { loading }] = useMutation(
    RegisterSoloAgentDocument,
  );
  const { uploading, upload } = useCloudinaryUpload();

  return (
    <div className="max-w-md mx-auto space-y-4">
      <Form
        onSubmit={handleSubmit(async ({ image, password, email, ...data }) => {
          try {
            const images = await upload(image);
            const result = await registerSoloAgent({
              variables: {
                registerSoloAgentInput: {
                  ...data,
                  email,
                  password,
                  image: images[0],
                },
              },
            });

            if (!result.data?.registerSoloAgent) {
              return;
            }

            reset();
            const signInResult = await signIn('credentials', {
              email,
              password,
              redirect: false,
            });

            if (signInResult?.error) {
              toast(t('registerSoloAgent.accountCreatedLoginFailed'));
              window.location.href = `${agentAppUrl}/login`;
              return;
            }

            window.location.href = `${agentAppUrl}/my-properties`;
          } catch (error) {
            const message = getApiErrorMessage({
              error,
              locale,
              fallbackMessage: t('registerSoloAgent.accountCreateFailed'),
            });
            toast(message);
          }
        })}
      >
        <HtmlLabel
          title={t('registerSoloAgent.email')}
          error={errors.email?.message}
        >
          <HtmlInput
            type="email"
            placeholder={t('registerSoloAgent.emailPlaceholder')}
            {...register('email')}
          />
        </HtmlLabel>
        <HtmlLabel
          title={t('registerSoloAgent.password')}
          error={errors.password?.message}
        >
          <HtmlInput
            type="password"
            placeholder={t('registerSoloAgent.passwordPlaceholder')}
            {...register('password')}
          />
        </HtmlLabel>
        <HtmlLabel
          title={t('registerSoloAgent.name')}
          error={errors.displayName?.message}
        >
          <HtmlInput
            placeholder={t('registerSoloAgent.namePlaceholder')}
            {...register('displayName')}
          />
        </HtmlLabel>
        <HtmlLabel
          title={t('registerSoloAgent.license')}
          error={errors.licenseID?.message}
        >
          <HtmlInput
            placeholder={t('registerSoloAgent.licensePlaceholder')}
            {...register('licenseID')}
          />
        </HtmlLabel>
        <ImagePreview srcs={image} clearImage={() => resetField('image')}>
          <Controller
            control={control}
            name="image"
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
        <p className="text-xs text-gray-600">
          {t('registerSoloAgent.profilePending')}
        </p>
        <Button loading={uploading || loading} type="submit" fullWidth>
          {t('registerSoloAgent.createAccount')}
        </Button>
        <p className="text-sm text-center">
          {t('registerSoloAgent.alreadyHasAccount')}{' '}
          <Link
            href={`${agentAppUrl}/login`}
            className="font-semibold underline underline-offset-4"
          >
            {t('registerSoloAgent.enterAgentPanel')}
          </Link>
        </p>
      </Form>
    </div>
  );
};
