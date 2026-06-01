import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from 'src/common/prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';
import { PropertyOrderByWithRelationInput } from 'src/models/properties/graphql/dtos/order-by.args';

@InputType()
export class AddressOrderByWithRelationInputStrict
  implements
    RestrictProperties<
      AddressOrderByWithRelationInputStrict,
      Prisma.AddressOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder)
  id: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  createdAt: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  updatedAt: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  address: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  lat: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  lng: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  propertyId: Prisma.SortOrder;

  Property: PropertyOrderByWithRelationInput;
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}

@InputType()
export class AddressOrderByWithRelationInput extends PartialType(
  AddressOrderByWithRelationInputStrict,
) {}

@InputType()
export class AddressOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder;
}
