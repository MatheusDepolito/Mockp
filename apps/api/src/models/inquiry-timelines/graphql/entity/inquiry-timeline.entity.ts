import { Field, Float, ObjectType } from '@nestjs/graphql';
import {
  $Enums,
  InquiryTimeline as InquiryTimelineType,
  Prisma,
} from 'src/common/prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@ObjectType()
export class InquiryTimeline
  implements RestrictProperties<InquiryTimeline, InquiryTimelineType>
{
  @Field(() => Float)
  id: number;
  @Field()
  timestamp: Date;
  @Field(() => $Enums.InquiryStatus)
  status: $Enums.InquiryStatus;
  @Field(() => Float)
  inquiryId: number;
  @Field({ nullable: true })
  agentId: string;
  @Field({ nullable: true })
  managerId: string;
  // Todo Add below to make optional fields optional.
  // @Field({ nullable: true })
}
