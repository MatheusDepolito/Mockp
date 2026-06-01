import { formSchemaCreatePropertyFeature } from './createProperty';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export type FormTypeCreateManyPropertyFeatures = z.infer<
  typeof formSchemaCreatePropertyFeature
>;

export const useFormCreateManyPropertyFeatures = () =>
  useForm<FormTypeCreateManyPropertyFeatures>({
    resolver: zodResolver(formSchemaCreatePropertyFeature),
    defaultValues: {
      quantity: 1,
      type: undefined,
    },
  });
