import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from 'src/common/prisma/client';
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input';
import { InquiryTimelineListRelationFilter } from 'src/models/inquiry-timelines/graphql/dtos/where.args';
import { BrokerageRelationFilter } from 'src/models/brokerages/graphql/dtos/where.args';
import { UserRelationFilter } from 'src/models/users/graphql/dtos/where.args';

@InputType()
export class BrokerageManagerWhereUniqueInput {
  uid: string;
}

@InputType()
export class BrokerageManagerWhereInputStrict
  implements
    RestrictProperties<
      BrokerageManagerWhereInputStrict,
      Prisma.BrokerageManagerWhereInput
    >
{
  User: UserRelationFilter;
  uid: StringFilter;
  createdAt: DateTimeFilter;
  updatedAt: DateTimeFilter;
  displayName: StringFilter;
  brokerageId: IntFilter;
  Brokerage: BrokerageRelationFilter;
  InquiryTimeline: InquiryTimelineListRelationFilter;

  AND: BrokerageManagerWhereInput[];
  OR: BrokerageManagerWhereInput[];
  NOT: BrokerageManagerWhereInput[];
}

@InputType()
export class BrokerageManagerWhereInput extends PartialType(
  BrokerageManagerWhereInputStrict,
) {}

@InputType()
export class BrokerageManagerListRelationFilter {
  every?: BrokerageManagerWhereInput;
  some?: BrokerageManagerWhereInput;
  none?: BrokerageManagerWhereInput;
}

@InputType()
export class BrokerageManagerRelationFilter {
  is?: BrokerageManagerWhereInput;
  isNot?: BrokerageManagerWhereInput;
}
