import { Field, InputType, PartialType } from '@nestjs/graphql';
import { $Enums, InquiryStatus, Prisma } from 'src/common/prisma/client';
import {
  DateTimeFilter,
  FloatFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input';
import { InquiryTimelineListRelationFilter } from 'src/models/inquiry-timelines/graphql/dtos/where.args';
import { CustomerRelationFilter } from 'src/models/customers/graphql/dtos/where.args';
import { PropertyRelationFilter } from 'src/models/properties/graphql/dtos/where.args';
import { AgentAssignmentRelationFilter } from 'src/models/agent-assignments/graphql/dtos/where.args';

@InputType()
export class InquiryWhereUniqueInput {
  id: number;
}

@InputType()
export class EnumInquiryStatusFilter {
  @Field(() => InquiryStatus, { nullable: true })
  equals: InquiryStatus;
  @Field(() => [InquiryStatus], { nullable: true })
  in: InquiryStatus[];
  @Field(() => [InquiryStatus], { nullable: true })
  notIn: InquiryStatus[];
  @Field(() => InquiryStatus, { nullable: true })
  not: InquiryStatus;
}

@InputType()
export class InquiryWhereInputStrict
  implements
    RestrictProperties<InquiryWhereInputStrict, Prisma.InquiryWhereInput>
{
  id: IntFilter;
  createdAt: DateTimeFilter;
  updatedAt: DateTimeFilter;
  listPriceAtInquiry: FloatFilter;
  totalPrice: FloatFilter;
  startTime: DateTimeFilter;
  endTime: DateTimeFilter;
  contactNotes: StringFilter;
  phoneNumber: StringFilter;
  passcode: StringFilter;

  status: EnumInquiryStatusFilter;
  propertyId: IntFilter;
  customerId: StringFilter;
  AgentAssignment: AgentAssignmentRelationFilter;
  Customer: CustomerRelationFilter;
  Property: PropertyRelationFilter;
  InquiryTimeline: InquiryTimelineListRelationFilter;

  AND: InquiryWhereInput[];
  OR: InquiryWhereInput[];
  NOT: InquiryWhereInput[];
}

@InputType()
export class InquiryWhereInput extends PartialType(InquiryWhereInputStrict) {}

@InputType()
export class InquiryListRelationFilter {
  every?: InquiryWhereInput;
  some?: InquiryWhereInput;
  none?: InquiryWhereInput;
}

@InputType()
export class InquiryRelationFilter {
  is?: InquiryWhereInput;
  isNot?: InquiryWhereInput;
}
