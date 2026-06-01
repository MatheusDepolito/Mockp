import { InputType, OmitType, PickType } from '@nestjs/graphql';
import { PropertyFeature } from '../entity/property-feature.entity';

@InputType()
export class CreatePropertyFeatureInput extends OmitType(
  PropertyFeature,
  ['createdAt', 'updatedAt', 'id'],
  InputType,
) {}

@InputType()
export class CreatePropertyFeatureInputWithoutPropertyId extends OmitType(
  CreatePropertyFeatureInput,
  ['propertyId'],
  InputType,
) {}
