import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from 'src/common/prisma/client';
import {
  BoolFilter,
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input';
import { InquiryTimelineListRelationFilter } from 'src/models/inquiry-timelines/graphql/dtos/where.args';
import { BrokerageRelationFilter } from 'src/models/brokerages/graphql/dtos/where.args';
import { UserRelationFilter } from 'src/models/users/graphql/dtos/where.args';
import { AgentAssignmentListRelationFilter } from 'src/models/agent-assignments/graphql/dtos/where.args';
import { PropertyListRelationFilter } from 'src/models/properties/graphql/dtos/where.args';

@InputType()
export class AgentWhereUniqueInput {
  uid: string;
}

@InputType()
export class AgentWhereInputStrict
  implements RestrictProperties<AgentWhereInputStrict, Prisma.AgentWhereInput>
{
  uid: StringFilter;
  createdAt: DateTimeFilter;
  updatedAt: DateTimeFilter;
  displayName: StringFilter;
  image: StringFilter;
  licenseID: StringFilter;
  verified: BoolFilter;
  brokerageId: IntFilter;
  User: UserRelationFilter;
  Brokerage: BrokerageRelationFilter;
  InquiryTimeline: InquiryTimelineListRelationFilter;
  AgentAssignments: AgentAssignmentListRelationFilter;
  ResponsibleProperties: PropertyListRelationFilter;
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: AgentWhereInput[];
  OR: AgentWhereInput[];
  NOT: AgentWhereInput[];
}

@InputType()
export class AgentWhereInput extends PartialType(AgentWhereInputStrict) {}

@InputType()
export class AgentListRelationFilter {
  every?: AgentWhereInput;
  some?: AgentWhereInput;
  none?: AgentWhereInput;
}

@InputType()
export class AgentRelationFilter {
  is?: AgentWhereInput;
  isNot?: AgentWhereInput;
}
