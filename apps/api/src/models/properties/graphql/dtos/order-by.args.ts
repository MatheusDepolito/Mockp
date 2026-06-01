import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from 'src/common/prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';
import { AddressOrderByWithRelationInput } from 'src/models/addresses/graphql/dtos/order-by.args';
import { BrokerageOrderByWithRelationInput } from 'src/models/brokerages/graphql/dtos/order-by.args';
import { ReviewOrderByRelationAggregateInput } from 'src/models/reviews/graphql/dtos/order-by.args';
import { PropertyFeatureOrderByRelationAggregateInput } from 'src/models/property-features/graphql/dtos/order-by.args';
import { VerificationOrderByWithRelationInput } from 'src/models/verifications/graphql/dtos/order-by.args';
import { AgentOrderByWithRelationInput } from 'src/models/agents/graphql/dtos/order-by.args';
import { InquiryOrderByRelationAggregateInput } from 'src/models/inquiries/graphql/dtos/order-by.args';

@InputType()
export class PropertyOrderByWithRelationInputStrict
  implements
    RestrictProperties<
      PropertyOrderByWithRelationInputStrict,
      Prisma.PropertyOrderByWithRelationInput
    >
{
  @Field(() => Prisma.SortOrder)
  id: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  createdAt: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  updatedAt: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  displayName: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  description: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  images: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  propertyType: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  purpose: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  listPrice: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  brokerageId: Prisma.SortOrder;
  @Field(() => Prisma.SortOrder)
  responsibleAgentId: Prisma.SortOrder;
  Brokerage: BrokerageOrderByWithRelationInput;
  ResponsibleAgent: AgentOrderByWithRelationInput;
  Address: AddressOrderByWithRelationInput;
  Verification: VerificationOrderByWithRelationInput;
  Reviews: ReviewOrderByRelationAggregateInput;
  PropertyFeatures: PropertyFeatureOrderByRelationAggregateInput;
  Inquiries: InquiryOrderByRelationAggregateInput;
}

@InputType()
export class PropertyOrderByWithRelationInput extends PartialType(
  PropertyOrderByWithRelationInputStrict,
) {}

@InputType()
export class PropertyOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder;
}
