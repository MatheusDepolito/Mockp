import { PartialType } from '@nestjs/swagger';
import { CreateValet } from './create.dto';
import { Valet } from 'src/common/prisma/client';

export class UpdateValet extends PartialType(CreateValet) {
  uid: Valet['uid'];
}
