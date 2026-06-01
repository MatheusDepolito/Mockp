import {
  ArgsType,
  Field,
  registerEnumType,
  PartialType,
} from '@nestjs/graphql';
import { Prisma } from 'src/common/prisma/client';
import { AgentOrderByWithRelationInput } from './order-by.args';
import { AgentWhereInput, AgentWhereUniqueInput } from './where.args';
import { RestrictProperties } from 'src/common/dtos/common.input';

registerEnumType(Prisma.AgentScalarFieldEnum, {
  name: 'AgentScalarFieldEnum',
});

@ArgsType()
class FindManyAgentArgsStrict
  implements
    RestrictProperties<
      FindManyAgentArgsStrict,
      Omit<Prisma.AgentFindManyArgs, 'include' | 'select' | 'omit'>
    >
{
  where: AgentWhereInput;
  orderBy: AgentOrderByWithRelationInput[];
  cursor: AgentWhereUniqueInput;
  take: number;
  skip: number;
  @Field(() => [Prisma.AgentScalarFieldEnum])
  distinct: Prisma.AgentScalarFieldEnum[];
}

@ArgsType()
export class FindManyAgentArgs extends PartialType(FindManyAgentArgsStrict) {}

@ArgsType()
export class FindUniqueAgentArgs {
  where: AgentWhereUniqueInput;
}
