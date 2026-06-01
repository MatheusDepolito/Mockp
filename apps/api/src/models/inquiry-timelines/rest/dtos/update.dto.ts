import { PartialType } from '@nestjs/swagger';
import { CreateInquiryTimeline } from './create.dto';
import { InquiryTimeline } from 'src/common/prisma/client';

export class UpdateInquiryTimeline extends PartialType(CreateInquiryTimeline) {
  id: InquiryTimeline['id'];
}
