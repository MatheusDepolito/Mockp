import { Field, ObjectType } from '@nestjs/graphql';
import {
  PropertyFeature as PropertyFeatureTypeModel,
  PropertyFeatureType,
} from 'src/common/prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@ObjectType()
export class PropertyFeature
  implements RestrictProperties<PropertyFeature, PropertyFeatureTypeModel>
{
  id: number;
  createdAt: Date;
  updatedAt: Date;
  @Field({ nullable: true })
  displayName: string;
  @Field(() => PropertyFeatureType)
  type: PropertyFeatureType;
  quantity: number;
  propertyId: number;
}
