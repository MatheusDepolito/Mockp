import {
  ArgsType,
  Field,
  registerEnumType,
  PartialType,
} from '@nestjs/graphql';
import { Prisma } from 'src/common/prisma/client';
import { InquiryOrderByWithRelationInput } from './order-by.args';
import { InquiryWhereInput, InquiryWhereUniqueInput } from './where.args';
import { RestrictProperties } from 'src/common/dtos/common.input';

registerEnumType(Prisma.InquiryScalarFieldEnum, {
  name: 'InquiryScalarFieldEnum',
});

@ArgsType()
class FindManyInquiryArgsStrict
  implements
    RestrictProperties<
      FindManyInquiryArgsStrict,
      Omit<Prisma.InquiryFindManyArgs, 'include' | 'select' | 'omit'>
    >
{
  where: InquiryWhereInput;
  orderBy: InquiryOrderByWithRelationInput[];
  cursor: InquiryWhereUniqueInput;
  take: number;
  skip: number;
  @Field(() => [Prisma.InquiryScalarFieldEnum])
  distinct: Prisma.InquiryScalarFieldEnum[];
}

@ArgsType()
export class FindManyInquiryArgs extends PartialType(
  FindManyInquiryArgsStrict,
) {}

@ArgsType()
export class FindUniqueInquiryArgs {
  where: InquiryWhereUniqueInput;
}
