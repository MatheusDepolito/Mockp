import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from 'src/common/prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';
import { InquiryOrderByWithRelationInput } from 'src/models/inquiries/graphql/dtos/order-by.args';
import { BrokerageManagerOrderByWithRelationInput } from 'src/models/brokerage-managers/graphql/dtos/order-by.args';
import { AgentOrderByWithRelationInput } from 'src/models/agents/graphql/dtos/order-by.args';

@InputType()
export class InquiryTimelineOrderByWithRelationInputStrict
  implements
    RestrictProperties<
      InquiryTimelineOrderByWithRelationInputStrict,
      Prisma.InquiryTimelineOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder)
  id: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  timestamp: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  status: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  inquiryId: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  agentId: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  managerId: Prisma.SortOrder;
  Inquiry: InquiryOrderByWithRelationInput;
  Agent: AgentOrderByWithRelationInput;
  BrokerageManager: BrokerageManagerOrderByWithRelationInput;
}

@InputType()
export class InquiryTimelineOrderByWithRelationInput extends PartialType(
  InquiryTimelineOrderByWithRelationInputStrict,
) {}

@InputType()
export class InquiryTimelineOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder;
}
