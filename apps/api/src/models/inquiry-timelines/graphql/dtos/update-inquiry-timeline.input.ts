import { CreateInquiryTimelineInput } from './create-inquiry-timeline.input';
import { Field, Float, InputType, PartialType } from '@nestjs/graphql';
import { InquiryTimeline } from 'src/common/prisma/client';

@InputType()
export class UpdateInquiryTimelineInput extends PartialType(
  CreateInquiryTimelineInput,
) {
  @Field(() => Float)
  id: InquiryTimeline['id'];
}
