import { Field, InputType, PartialType } from '@nestjs/graphql';
import { $Enums, Prisma } from 'src/common/prisma/client';
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input';
import { InquiryRelationFilter } from 'src/models/inquiries/graphql/dtos/where.args';
import { BrokerageManagerRelationFilter } from 'src/models/brokerage-managers/graphql/dtos/where.args';
import { AgentRelationFilter } from 'src/models/agents/graphql/dtos/where.args';

@InputType()
export class InquiryTimelineWhereUniqueInput {
  id: number;
}

@InputType()
export class InquiryTimelineWhereInputStrict
  implements
    RestrictProperties<
      InquiryTimelineWhereInputStrict,
      Prisma.InquiryTimelineWhereInput
    >
{
  id: IntFilter;
  timestamp: DateTimeFilter;
  @Field(() => $Enums.InquiryStatus)
  status: $Enums.InquiryStatus;
  inquiryId: IntFilter;
  agentId: StringFilter;
  managerId: StringFilter;
  Inquiry: InquiryRelationFilter;
  Agent: AgentRelationFilter;
  BrokerageManager: BrokerageManagerRelationFilter;

  AND: InquiryTimelineWhereInput[];
  OR: InquiryTimelineWhereInput[];
  NOT: InquiryTimelineWhereInput[];
}

@InputType()
export class InquiryTimelineWhereInput extends PartialType(
  InquiryTimelineWhereInputStrict,
) {}

@InputType()
export class InquiryTimelineListRelationFilter {
  every?: InquiryTimelineWhereInput;
  some?: InquiryTimelineWhereInput;
  none?: InquiryTimelineWhereInput;
}

@InputType()
export class InquiryTimelineRelationFilter {
  is?: InquiryTimelineWhereInput;
  isNot?: InquiryTimelineWhereInput;
}
