import { PartialType } from '@nestjs/swagger';
import { CreateBrokerage } from './create.dto';
import { Brokerage } from 'src/common/prisma/client';

export class UpdateBrokerage extends PartialType(CreateBrokerage) {
  id: Brokerage['id'];
}
