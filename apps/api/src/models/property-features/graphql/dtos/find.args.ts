import {
  ArgsType,
  Field,
  registerEnumType,
  PartialType,
} from '@nestjs/graphql';
import { Prisma } from 'src/common/prisma/client';
import { PropertyFeatureOrderByWithRelationInput } from './order-by.args';
import {
  PropertyFeatureWhereInput,
  PropertyFeatureWhereUniqueInput,
} from './where.args';
import { RestrictProperties } from 'src/common/dtos/common.input';

registerEnumType(Prisma.PropertyFeatureScalarFieldEnum, {
  name: 'PropertyFeatureScalarFieldEnum',
});

@ArgsType()
class FindManyPropertyFeatureArgsStrict
  implements
    RestrictProperties<
      FindManyPropertyFeatureArgsStrict,
      Omit<Prisma.PropertyFeatureFindManyArgs, 'include' | 'select' | 'omit'>
    >
{
  where: PropertyFeatureWhereInput;
  orderBy: PropertyFeatureOrderByWithRelationInput[];
  cursor: PropertyFeatureWhereUniqueInput;
  take: number;
  skip: number;
  @Field(() => [Prisma.PropertyFeatureScalarFieldEnum])
  distinct: Prisma.PropertyFeatureScalarFieldEnum[];
}

@ArgsType()
export class FindManyPropertyFeatureArgs extends PartialType(
  FindManyPropertyFeatureArgsStrict,
) {}

@ArgsType()
export class FindUniquePropertyFeatureArgs {
  where: PropertyFeatureWhereUniqueInput;
}
