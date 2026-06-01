import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from 'src/common/prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';
import { AdminOrderByWithRelationInput } from 'src/models/admins/graphql/dtos/order-by.args';
import { PropertyOrderByWithRelationInput } from 'src/models/properties/graphql/dtos/order-by.args';

@InputType()
export class VerificationOrderByWithRelationInputStrict
  implements
    RestrictProperties<
      VerificationOrderByWithRelationInputStrict,
      Prisma.VerificationOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder)
  createdAt: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  updatedAt: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  verified: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  adminId: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  propertyId: Prisma.SortOrder;
  Admin: AdminOrderByWithRelationInput;
  Property: PropertyOrderByWithRelationInput;
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}

@InputType()
export class VerificationOrderByWithRelationInput extends PartialType(
  VerificationOrderByWithRelationInputStrict,
) {}

@InputType()
export class VerificationOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder;
}
