import { PartialType } from '@nestjs/swagger';
import { CreateValetAssignment } from './create.dto';
import { ValetAssignment } from 'src/common/prisma/client';

export class UpdateValetAssignment extends PartialType(CreateValetAssignment) {
  bookingId: ValetAssignment['bookingId'];
}
