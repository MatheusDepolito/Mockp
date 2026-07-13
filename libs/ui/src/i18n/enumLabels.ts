import {
  InquiryStatus,
  PropertyFeatureType,
  PropertyPurpose,
  PropertyType,
} from '@mockp/network/src/gql/generated';
import { Locale } from '@mockp/util/i18n';

export const inquiryStatusLabels: Record<
  Locale,
  Record<InquiryStatus, string>
> = {
  'pt-BR': {
    [InquiryStatus.Interested]: 'Interessado',
    [InquiryStatus.VisitScheduled]: 'Visita agendada',
    [InquiryStatus.Proposal]: 'Proposta',
    [InquiryStatus.Closed]: 'Encerrado',
  },
  'en-US': {
    [InquiryStatus.Interested]: 'Interested',
    [InquiryStatus.VisitScheduled]: 'Visit scheduled',
    [InquiryStatus.Proposal]: 'Proposal',
    [InquiryStatus.Closed]: 'Closed',
  },
};

export const propertyTypeLabels: Record<
  Locale,
  Record<PropertyType, string>
> = {
  'pt-BR': {
    [PropertyType.Apartment]: 'Apartamento',
    [PropertyType.House]: 'Casa',
  },
  'en-US': {
    [PropertyType.Apartment]: 'Apartment',
    [PropertyType.House]: 'House',
  },
};

export const propertyPurposeLabels: Record<
  Locale,
  Record<PropertyPurpose, string>
> = {
  'pt-BR': {
    [PropertyPurpose.Rent]: 'Aluguel',
    [PropertyPurpose.RentAndSale]: 'Aluguel e venda',
    [PropertyPurpose.Sale]: 'Venda',
  },
  'en-US': {
    [PropertyPurpose.Rent]: 'Rent',
    [PropertyPurpose.RentAndSale]: 'Rent and sale',
    [PropertyPurpose.Sale]: 'Sale',
  },
};

export const propertyFeatureTypeLabels: Record<
  Locale,
  Record<PropertyFeatureType, string>
> = {
  'pt-BR': {
    [PropertyFeatureType.AirConditioner]: 'Ar-condicionado',
    [PropertyFeatureType.Bathroom]: 'Banheiro',
    [PropertyFeatureType.Bedroom]: 'Quarto',
    [PropertyFeatureType.BuiltInWardrobe]: 'Armario embutido',
    [PropertyFeatureType.FurnishedKitchen]: 'Cozinha mobiliada',
    [PropertyFeatureType.Other]: 'Outro',
    [PropertyFeatureType.ParkingSpot]: 'Vaga',
  },
  'en-US': {
    [PropertyFeatureType.AirConditioner]: 'Air conditioner',
    [PropertyFeatureType.Bathroom]: 'Bathroom',
    [PropertyFeatureType.Bedroom]: 'Bedroom',
    [PropertyFeatureType.BuiltInWardrobe]: 'Built-in wardrobe',
    [PropertyFeatureType.FurnishedKitchen]: 'Furnished kitchen',
    [PropertyFeatureType.Other]: 'Other',
    [PropertyFeatureType.ParkingSpot]: 'Parking spot',
  },
};

export const getInquiryStatusLabel = (value: InquiryStatus, locale: Locale) => {
  return inquiryStatusLabels[locale][value];
};

export const getPropertyTypeLabel = (value: PropertyType, locale: Locale) => {
  return propertyTypeLabels[locale][value];
};

export const getPropertyPurposeLabel = (
  value: PropertyPurpose,
  locale: Locale,
) => {
  return propertyPurposeLabels[locale][value];
};

export const getPropertyFeatureTypeLabel = (
  value: PropertyFeatureType,
  locale: Locale,
) => {
  return propertyFeatureTypeLabels[locale][value];
};
