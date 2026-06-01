import { CreatePropertyFeatureInput } from './create-property-feature.input';
import { InputType, PartialType } from '@nestjs/graphql';
import { PropertyFeature } from 'src/common/prisma/client';

@InputType()
export class UpdatePropertyFeatureInput extends PartialType(
  CreatePropertyFeatureInput,
) {
  id: PropertyFeature['id'];
}
