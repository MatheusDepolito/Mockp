import { z } from 'zod';
import { isEndTimeValid, isStartTimeValid } from './util';
import { DefaultValues, FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';

export const visitInfo = z.object({
  lat: z.number(),
  lng: z.number(),
  notes: z.string().optional(),
});

export const formSchemaBookPropertyFeature = z
  .object({
    startTime: z.string(),
    endTime: z.string(),
    contactNotes: z
      .string()
      .min(1, { message: 'Observações de contato são obrigatórias' }),
    phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
    visitInfo: visitInfo.optional(),
  })
  .refine(({ startTime }) => isStartTimeValid(startTime), {
    message: 'Start time should be greater than current time',
    path: ['startTime'],
  })
  .refine(({ endTime, startTime }) => isEndTimeValid({ endTime, startTime }), {
    message: 'End time should be greater than start time',
    path: ['endTime'],
  });

export type FormTypeBookPropertyFeature = z.infer<
  typeof formSchemaBookPropertyFeature
>;

export const userFormBookPropertyFeature = ({
  defaultValues,
}: {
  defaultValues: DefaultValues<FormTypeBookPropertyFeature>;
}) =>
  useForm<FormTypeBookPropertyFeature>({
    resolver: zodResolver(formSchemaBookPropertyFeature),
    defaultValues,
    mode: 'onChange',
  });

export const FormProviderBookPropertyFeature = ({
  children,
  defaultValues,
}: {
  children: ReactNode;
  defaultValues: DefaultValues<FormTypeBookPropertyFeature>;
}) => {
  const methods = userFormBookPropertyFeature({ defaultValues });

  return <FormProvider {...methods}>{children}</FormProvider>;
};
