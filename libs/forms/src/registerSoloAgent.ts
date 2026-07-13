import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getMessages, Locale } from '@mockp/util/i18n';

export const createSchemaRegisterSoloAgent = (locale: Locale) => {
  const messages = getMessages(locale).forms;

  return z.object({
    email: z.string().email({ message: messages.validEmail }),
    password: z.string().min(6, { message: messages.passwordMin }),
    displayName: z.string().min(1, { message: messages.requiredName }),
    licenseID: z.string().min(1, { message: messages.requiredLicense }),
    image: z.any().optional(),
  });
};

export const schemaRegisterSoloAgent = createSchemaRegisterSoloAgent('pt-BR');

export type FormTypeRegisterSoloAgent = z.infer<typeof schemaRegisterSoloAgent>;

export const useFormRegisterSoloAgent = (locale: Locale = 'pt-BR') =>
  useForm<FormTypeRegisterSoloAgent>({
    resolver: zodResolver(createSchemaRegisterSoloAgent(locale)),
  });
