import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from 'src/common/prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';
import { InquiryTimelineOrderByRelationAggregateInput } from 'src/models/inquiry-timelines/graphql/dtos/order-by.args';
import { BrokerageOrderByWithRelationInput } from 'src/models/brokerages/graphql/dtos/order-by.args';
import { UserOrderByWithRelationInput } from 'src/models/users/graphql/dtos/order-by.args';

@InputType()
export class BrokerageManagerOrderByWithRelationInputStrict
  implements
    RestrictProperties<
      BrokerageManagerOrderByWithRelationInputStrict,
      Prisma.BrokerageManagerOrderByWithRelationInput
    >
{
  User: UserOrderByWithRelationInput;
  @Field(() => Prisma.SortOrder)
  uid: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  createdAt: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  updatedAt: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  displayName: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  brokerageId: Prisma.SortOrder;

  Brokerage: BrokerageOrderByWithRelationInput;
  InquiryTimeline: InquiryTimelineOrderByRelationAggregateInput;
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}

@InputType()
export class BrokerageManagerOrderByWithRelationInput extends PartialType(
  BrokerageManagerOrderByWithRelationInputStrict,
) {}

@InputType()
export class BrokerageManagerOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder;
}
