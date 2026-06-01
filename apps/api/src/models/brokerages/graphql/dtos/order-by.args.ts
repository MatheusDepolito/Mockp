import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from 'src/common/prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';
import { PropertyOrderByRelationAggregateInput } from 'src/models/properties/graphql/dtos/order-by.args';
import { BrokerageManagerOrderByRelationAggregateInput } from 'src/models/brokerage-managers/graphql/dtos/order-by.args';
import { AgentOrderByRelationAggregateInput } from 'src/models/agents/graphql/dtos/order-by.args';

@InputType()
export class BrokerageOrderByWithRelationInputStrict
  implements
    RestrictProperties<
      BrokerageOrderByWithRelationInputStrict,
      Prisma.BrokerageOrderByWithRelationInput
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
  Properties: PropertyOrderByRelationAggregateInput;
  BrokerageManagers: BrokerageManagerOrderByRelationAggregateInput;
  Agents: AgentOrderByRelationAggregateInput;
}

@InputType()
export class BrokerageOrderByWithRelationInput extends PartialType(
  BrokerageOrderByWithRelationInputStrict,
) {}

@InputType()
export class BrokerageOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder;
}
