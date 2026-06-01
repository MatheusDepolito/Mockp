import {
  ArgsType,
  Field,
  registerEnumType,
  PartialType,
} from '@nestjs/graphql';
import { Prisma } from 'src/common/prisma/client';
import { BrokerageOrderByWithRelationInput } from './order-by.args';
import { BrokerageWhereInput, BrokerageWhereUniqueInput } from './where.args';
import { RestrictProperties } from 'src/common/dtos/common.input';

registerEnumType(Prisma.BrokerageScalarFieldEnum, {
  name: 'BrokerageScalarFieldEnum',
});

@ArgsType()
class FindManyBrokerageArgsStrict
  implements
    RestrictProperties<
      FindManyBrokerageArgsStrict,
      Omit<Prisma.BrokerageFindManyArgs, 'include' | 'select' | 'omit'>
    >
{
  where: BrokerageWhereInput;
  orderBy: BrokerageOrderByWithRelationInput[];
  cursor: BrokerageWhereUniqueInput;
  take: number;
  skip: number;
  @Field(() => [Prisma.BrokerageScalarFieldEnum])
  distinct: Prisma.BrokerageScalarFieldEnum[];
}

@ArgsType()
export class FindManyBrokerageArgs extends PartialType(
  FindManyBrokerageArgsStrict,
) {}

@ArgsType()
export class FindUniqueBrokerageArgs {
  where: BrokerageWhereUniqueInput;
}
