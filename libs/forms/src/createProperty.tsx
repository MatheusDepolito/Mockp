import {
  PropertyFeatureType,
  PropertyPurpose,
  PropertyType,
} from '@mockp/network/src/gql/generated';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { ReactNode } from 'react';

export const formSchemaAddress = z.object({
  lat: z.number(),
  lng: z.number(),
  address: z.string().min(1),
});

export const formSchemaCreatePropertyFeature = z.object({
  quantity: z.number().min(1).max(50),
  type: z.nativeEnum(PropertyFeatureType),
  displayName: z.string().optional(),
});

export const formSchemaCreateProperty = z.object({
  displayName: z.string().min(1),
  description: z.string().min(1),
  images: z.any(),
  propertyType: z.nativeEnum(PropertyType),
  purpose: z.nativeEnum(PropertyPurpose),
  listPrice: z.number().optional(),
  responsibleAgentId: z
    .string()
    .min(1, { message: 'Selecione o corretor responsável' }),
  location: formSchemaAddress,
  propertyFeatures: z.array(formSchemaCreatePropertyFeature),
});

export type FormTypeCreateProperty = z.infer<typeof formSchemaCreateProperty>;

export const useFormCreateProperty = () =>
  useForm<FormTypeCreateProperty>({
    resolver: zodResolver(formSchemaCreateProperty),
    defaultValues: {
      propertyFeatures: [],
      propertyType: PropertyType.Apartment,
      purpose: PropertyPurpose.Rent,
    },
  });

export const FormProviderCreateProperty = ({
  children,
}: {
  children: ReactNode;
}) => {
  const methods = useFormCreateProperty();
  return <FormProvider {...methods}>{children}</FormProvider>;
};
