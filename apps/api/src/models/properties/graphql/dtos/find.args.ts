import {
  ArgsType,
  Field,
  registerEnumType,
  PartialType,
} from '@nestjs/graphql';
import { Prisma } from 'src/common/prisma/client';
import { PropertyOrderByWithRelationInput } from './order-by.args';
import { PropertyWhereInput, PropertyWhereUniqueInput } from './where.args';
import { RestrictProperties } from 'src/common/dtos/common.input';

registerEnumType(Prisma.PropertyScalarFieldEnum, {
  name: 'PropertyScalarFieldEnum',
});

@ArgsType()
class FindManyPropertyArgsStrict
  implements
    RestrictProperties<
      FindManyPropertyArgsStrict,
      Omit<Prisma.PropertyFindManyArgs, 'include' | 'select' | 'omit'>
    >
{
  where: PropertyWhereInput;
  orderBy: PropertyOrderByWithRelationInput[];
  cursor: PropertyWhereUniqueInput;
  take: number;
  skip: number;
  @Field(() => [Prisma.PropertyScalarFieldEnum])
  distinct: Prisma.PropertyScalarFieldEnum[];
}

@ArgsType()
export class FindManyPropertyArgs extends PartialType(
  FindManyPropertyArgsStrict,
) {}

@ArgsType()
export class FindUniquePropertyArgs {
  where: PropertyWhereUniqueInput;
}
