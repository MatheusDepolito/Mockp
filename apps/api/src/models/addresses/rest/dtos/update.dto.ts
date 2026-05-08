import { PartialType } from '@nestjs/swagger';
import { CreateAddress } from './create.dto';
import { Address } from 'src/common/prisma/client';

export class UpdateAddress extends PartialType(CreateAddress) {
  id: Address['id'];
}
