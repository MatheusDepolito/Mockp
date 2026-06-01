import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from 'src/common/prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';
import { PropertyOrderByWithRelationInput } from 'src/models/properties/graphql/dtos/order-by.args';

@InputType()
export class PropertyFeatureOrderByWithRelationInputStrict
  implements
    RestrictProperties<
      PropertyFeatureOrderByWithRelationInputStrict,
      Prisma.PropertyFeatureOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder)
  id: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  createdAt: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  updatedAt: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  displayName: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  quantity: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  type: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  propertyId: Prisma.SortOrder;
  Property: PropertyOrderByWithRelationInput;
}

@InputType()
export class PropertyFeatureOrderByWithRelationInput extends PartialType(
  PropertyFeatureOrderByWithRelationInputStrict,
) {}

@InputType()
export class PropertyFeatureOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder;
}
