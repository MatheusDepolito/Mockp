import { PartialType } from '@nestjs/swagger';
import { CreateBooking } from './create.dto';
import { Booking } from 'src/common/prisma/client';

export class UpdateBooking extends PartialType(CreateBooking) {
  id: Booking['id'];
}
