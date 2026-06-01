import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Property as PropertyType,
  PropertyFeatureType,
  PropertyPurpose,
  PropertyType as PropertyKind,
} from 'src/common/prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

registerEnumType(PropertyKind, { name: 'PropertyType' });
registerEnumType(PropertyPurpose, { name: 'PropertyPurpose' });
registerEnumType(PropertyFeatureType, { name: 'PropertyFeatureType' });

@ObjectType()
export class Property implements RestrictProperties<Property, PropertyType> {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  @Field({ nullable: true })
  displayName: string;
  @Field({ nullable: true })
  description: string;
  images: string[];
  @Field(() => PropertyKind)
  propertyType: PropertyKind;
  @Field(() => PropertyPurpose)
  purpose: PropertyPurpose;
  @Field({ nullable: true })
  listPrice: number;
  @Field({ nullable: true })
  brokerageId: number;
  responsibleAgentId: string;
}

@ObjectType()
export class PropertyFeatureTypeCount {
  @Field(() => PropertyFeatureType)
  type: PropertyFeatureType;
  count?: number;
}
