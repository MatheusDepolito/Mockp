import { OmitType } from '@nestjs/swagger';
import { InquiryTimelineEntity } from '../entity/inquiry-timeline.entity';

export class CreateInquiryTimeline extends OmitType(InquiryTimelineEntity, [
  'id',
]) {}
