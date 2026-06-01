import {
  ArgsType,
  Field,
  registerEnumType,
  PartialType,
} from '@nestjs/graphql';
import { Prisma } from 'src/common/prisma/client';
import { AgentAssignmentOrderByWithRelationInput } from './order-by.args';
import {
  AgentAssignmentWhereInput,
  AgentAssignmentWhereUniqueInput,
} from './where.args';
import { RestrictProperties } from 'src/common/dtos/common.input';

registerEnumType(Prisma.AgentAssignmentScalarFieldEnum, {
  name: 'AgentAssignmentScalarFieldEnum',
});

@ArgsType()
class FindManyAgentAssignmentArgsStrict
  implements
    RestrictProperties<
      FindManyAgentAssignmentArgsStrict,
      Omit<Prisma.AgentAssignmentFindManyArgs, 'include' | 'select' | 'omit'>
    >
{
  where: AgentAssignmentWhereInput;
  orderBy: AgentAssignmentOrderByWithRelationInput[];
  cursor: AgentAssignmentWhereUniqueInput;
  take: number;
  skip: number;
  @Field(() => [Prisma.AgentAssignmentScalarFieldEnum])
  distinct: Prisma.AgentAssignmentScalarFieldEnum[];
}

@ArgsType()
export class FindManyAgentAssignmentArgs extends PartialType(
  FindManyAgentAssignmentArgsStrict,
) {}

@ArgsType()
export class FindUniqueAgentAssignmentArgs {
  where: AgentAssignmentWhereUniqueInput;
}
