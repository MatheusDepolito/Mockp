import { Field, Float, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from 'src/common/prisma/client';
import {
  DateTimeFilter,
  FloatFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input';
import { InquiryRelationFilter } from 'src/models/inquiries/graphql/dtos/where.args';
import { AgentRelationFilter } from 'src/models/agents/graphql/dtos/where.args';

@InputType()
export class AgentAssignmentWhereUniqueInput {
  @Field(() => Float)
  inquiryId: number;
}

@InputType()
export class AgentAssignmentWhereInputStrict
  implements
    RestrictProperties<
      AgentAssignmentWhereInputStrict,
      Prisma.AgentAssignmentWhereInput
    >
{
  inquiryId: IntFilter;
  createdAt: DateTimeFilter;
  updatedAt: DateTimeFilter;
  visitLat: FloatFilter;
  visitLng: FloatFilter;
  assignedAgentId: StringFilter;
  Inquiry: InquiryRelationFilter;
  AssignedAgent: AgentRelationFilter;

  AND: AgentAssignmentWhereInput[];
  OR: AgentAssignmentWhereInput[];
  NOT: AgentAssignmentWhereInput[];
}

@InputType()
export class AgentAssignmentWhereInput extends PartialType(
  AgentAssignmentWhereInputStrict,
) {}

@InputType()
export class AgentAssignmentListRelationFilter {
  every?: AgentAssignmentWhereInput;
  some?: AgentAssignmentWhereInput;
  none?: AgentAssignmentWhereInput;
}

@InputType()
export class AgentAssignmentRelationFilter {
  is?: AgentAssignmentWhereInput;
  isNot?: AgentAssignmentWhereInput;
}
