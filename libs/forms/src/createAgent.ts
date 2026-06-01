import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export const schemaCreateAgent = z.object({
  email: z.string().email({ message: 'Informe um e-mail válido' }),
  displayName: z.string().min(1, { message: 'Nome do corretor é obrigatório' }),
  licenseID: z.string().min(1, { message: 'CRECI/licença é obrigatório' }),
  image: z.any().optional(),
});

export type FormTypeCreateAgent = z.infer<typeof schemaCreateAgent>;

export const useFormCreateAgent = () =>
  useForm<FormTypeCreateAgent>({
    resolver: zodResolver(schemaCreateAgent),
  });
