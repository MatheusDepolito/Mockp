import {
  ArgsType,
  Field,
  registerEnumType,
  PartialType,
} from '@nestjs/graphql';
import { Prisma } from 'src/common/prisma/client';
import { BrokerageManagerOrderByWithRelationInput } from './order-by.args';
import {
  BrokerageManagerWhereInput,
  BrokerageManagerWhereUniqueInput,
} from './where.args';
import { RestrictProperties } from 'src/common/dtos/common.input';

registerEnumType(Prisma.BrokerageManagerScalarFieldEnum, {
  name: 'BrokerageManagerScalarFieldEnum',
});

@ArgsType()
class FindManyBrokerageManagerArgsStrict
  implements
    RestrictProperties<
      FindManyBrokerageManagerArgsStrict,
      Omit<Prisma.BrokerageManagerFindManyArgs, 'include' | 'select' | 'omit'>
    >
{
  where: BrokerageManagerWhereInput;
  orderBy: BrokerageManagerOrderByWithRelationInput[];
  cursor: BrokerageManagerWhereUniqueInput;
  take: number;
  skip: number;
  @Field(() => [Prisma.BrokerageManagerScalarFieldEnum])
  distinct: Prisma.BrokerageManagerScalarFieldEnum[];
}

@ArgsType()
export class FindManyBrokerageManagerArgs extends PartialType(
  FindManyBrokerageManagerArgsStrict,
) {}

@ArgsType()
export class FindUniqueBrokerageManagerArgs {
  where: BrokerageManagerWhereUniqueInput;
}
