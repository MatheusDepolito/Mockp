import { PartialType } from '@nestjs/swagger';
import { CreateBookingTimeline } from './create.dto';
import { BookingTimeline } from 'src/common/prisma/client';

export class UpdateBookingTimeline extends PartialType(CreateBookingTimeline) {
  id: BookingTimeline['id'];
}
