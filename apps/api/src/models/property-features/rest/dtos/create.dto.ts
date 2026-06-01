import { OmitType } from '@nestjs/swagger';
import { PropertyFeatureEntity } from '../entity/property-feature.entity';

export class CreatePropertyFeature extends OmitType(PropertyFeatureEntity, [
  'createdAt',
  'updatedAt',
  'id',
]) {}
