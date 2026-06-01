import {
  ArgsType,
  Field,
  registerEnumType,
  PartialType,
} from '@nestjs/graphql';
import { Prisma } from 'src/common/prisma/client';
import { InquiryTimelineOrderByWithRelationInput } from './order-by.args';
import {
  InquiryTimelineWhereInput,
  InquiryTimelineWhereUniqueInput,
} from './where.args';
import { RestrictProperties } from 'src/common/dtos/common.input';

registerEnumType(Prisma.InquiryTimelineScalarFieldEnum, {
  name: 'InquiryTimelineScalarFieldEnum',
});

@ArgsType()
class FindManyInquiryTimelineArgsStrict
  implements
    RestrictProperties<
      FindManyInquiryTimelineArgsStrict,
      Omit<Prisma.InquiryTimelineFindManyArgs, 'include' | 'select' | 'omit'>
    >
{
  where: InquiryTimelineWhereInput;
  orderBy: InquiryTimelineOrderByWithRelationInput[];
  cursor: InquiryTimelineWhereUniqueInput;
  take: number;
  skip: number;
  @Field(() => [Prisma.InquiryTimelineScalarFieldEnum])
  distinct: Prisma.InquiryTimelineScalarFieldEnum[];
}

@ArgsType()
export class FindManyInquiryTimelineArgs extends PartialType(
  FindManyInquiryTimelineArgsStrict,
) {}

@ArgsType()
export class FindUniqueInquiryTimelineArgs {
  where: InquiryTimelineWhereUniqueInput;
}
