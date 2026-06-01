import { Field, InputType, PickType } from '@nestjs/graphql';
import { Property } from '../entity/property.entity';
import { CreateAddressInputWithoutPropertyId } from 'src/models/addresses/graphql/dtos/create-address.input';
import { CreatePropertyFeatureInputWithoutPropertyId } from 'src/models/property-features/graphql/dtos/create-property-feature.input';

@InputType()
export class CreatePropertyInput extends PickType(
  Property,
  [
    'description',
    'displayName',
    'images',
    'propertyType',
    'purpose',
    'listPrice',
    'responsibleAgentId',
  ],
  InputType,
) {
  Address: CreateAddressInputWithoutPropertyId;
  PropertyFeatures: CreatePropertyFeatureInputWithoutPropertyId[];
  @Field({ nullable: true })
  brokerageId?: number;
}
