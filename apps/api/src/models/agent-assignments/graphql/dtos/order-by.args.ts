import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from 'src/common/prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';
import { InquiryOrderByWithRelationInput } from 'src/models/inquiries/graphql/dtos/order-by.args';
import { AgentOrderByWithRelationInput } from 'src/models/agents/graphql/dtos/order-by.args';

@InputType()
export class AgentAssignmentOrderByWithRelationInputStrict
  implements
    RestrictProperties<
      AgentAssignmentOrderByWithRelationInputStrict,
      Prisma.AgentAssignmentOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder)
  inquiryId: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  createdAt: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  updatedAt: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  visitLat: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  visitLng: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  assignedAgentId: Prisma.SortOrder;
  Inquiry: InquiryOrderByWithRelationInput;
  AssignedAgent: AgentOrderByWithRelationInput;
}

@InputType()
export class AgentAssignmentOrderByWithRelationInput extends PartialType(
  AgentAssignmentOrderByWithRelationInputStrict,
) {}

@InputType()
export class AgentAssignmentOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder;
}
