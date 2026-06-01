import { InputType, PickType } from '@nestjs/graphql';
import { InquiryTimeline } from '../entity/inquiry-timeline.entity';

@InputType()
export class CreateInquiryTimelineInput extends PickType(
  InquiryTimeline,
  ['inquiryId', 'status'],
  InputType,
) {}
