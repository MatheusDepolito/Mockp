import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from 'src/common/prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';
import { CustomerOrderByWithRelationInput } from 'src/models/customers/graphql/dtos/order-by.args';
import { PropertyOrderByWithRelationInput } from 'src/models/properties/graphql/dtos/order-by.args';

@InputType()
export class ReviewOrderByWithRelationInputStrict
  implements
    RestrictProperties<
      ReviewOrderByWithRelationInputStrict,
      Prisma.ReviewOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder)
  id: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  createdAt: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  updatedAt: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  rating: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  comment: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  customerId: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  propertyId: Prisma.SortOrder;
  Customer: CustomerOrderByWithRelationInput;
  Property: PropertyOrderByWithRelationInput;
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}

@InputType()
export class ReviewOrderByWithRelationInput extends PartialType(
  ReviewOrderByWithRelationInputStrict,
) {}

@InputType()
export class ReviewOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder;
}
