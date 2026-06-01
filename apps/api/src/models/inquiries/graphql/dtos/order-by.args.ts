import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from 'src/common/prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';
import { InquiryTimelineOrderByRelationAggregateInput } from 'src/models/inquiry-timelines/graphql/dtos/order-by.args';
import { CustomerOrderByWithRelationInput } from 'src/models/customers/graphql/dtos/order-by.args';
import { PropertyOrderByWithRelationInput } from 'src/models/properties/graphql/dtos/order-by.args';
import { AgentAssignmentOrderByWithRelationInput } from 'src/models/agent-assignments/graphql/dtos/order-by.args';

@InputType()
export class InquiryOrderByWithRelationInputStrict
  implements
    RestrictProperties<
      InquiryOrderByWithRelationInputStrict,
      Prisma.InquiryOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder)
  id: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  createdAt: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  updatedAt: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  listPriceAtInquiry: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  totalPrice: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  startTime: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  endTime: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  contactNotes: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  phoneNumber: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  passcode: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  status: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  propertyId: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  customerId: Prisma.SortOrder;
  AgentAssignment: AgentAssignmentOrderByWithRelationInput;
  Customer: CustomerOrderByWithRelationInput;
  Property: PropertyOrderByWithRelationInput;
  InquiryTimeline: InquiryTimelineOrderByRelationAggregateInput;
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}

@InputType()
export class InquiryOrderByWithRelationInput extends PartialType(
  InquiryOrderByWithRelationInputStrict,
) {}

@InputType()
export class InquiryOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder;
}
