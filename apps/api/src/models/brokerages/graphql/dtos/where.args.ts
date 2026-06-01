import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from 'src/common/prisma/client';
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input';
import { PropertyListRelationFilter } from 'src/models/properties/graphql/dtos/where.args';
import { BrokerageManagerListRelationFilter } from 'src/models/brokerage-managers/graphql/dtos/where.args';
import { AgentListRelationFilter } from 'src/models/agents/graphql/dtos/where.args';

@InputType()
export class BrokerageWhereUniqueInput {
  id: number;
}

@InputType()
export class BrokerageWhereInputStrict
  implements
    RestrictProperties<BrokerageWhereInputStrict, Prisma.BrokerageWhereInput>
{
  id: IntFilter;
  createdAt: DateTimeFilter;
  updatedAt: DateTimeFilter;
  displayName: StringFilter;
  description: StringFilter;
  Properties: PropertyListRelationFilter;
  BrokerageManagers: BrokerageManagerListRelationFilter;
  Agents: AgentListRelationFilter;

  AND: BrokerageWhereInput[];
  OR: BrokerageWhereInput[];
  NOT: BrokerageWhereInput[];
}

@InputType()
export class BrokerageWhereInput extends PartialType(
  BrokerageWhereInputStrict,
) {}

@InputType()
export class BrokerageListRelationFilter {
  every?: BrokerageWhereInput;
  some?: BrokerageWhereInput;
  none?: BrokerageWhereInput;
}

@InputType()
export class BrokerageRelationFilter {
  is?: BrokerageWhereInput;
  isNot?: BrokerageWhereInput;
}
