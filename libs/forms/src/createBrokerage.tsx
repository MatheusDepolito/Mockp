import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const formSchemaCreateBrokerage = z.object({
  displayName: z.string().min(1, { message: 'Brokerage name is required' }),
  description: z.string(),
  brokerageManagerId: z
    .string()
    .min(1, { message: 'BrokerageManager ID is required' }),
  managerName: z.string().optional().nullable(),
});

export type FormTypeCreateBrokerage = z.infer<typeof formSchemaCreateBrokerage>;

export const useFormCreateBrokerage = () =>
  useForm<FormTypeCreateBrokerage>({
    resolver: zodResolver(formSchemaCreateBrokerage),
  });
