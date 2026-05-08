import { PartialType } from '@nestjs/swagger';
import { CreateAdmin } from './create.dto';
import { Admin } from 'src/common/prisma/client';

export class UpdateAdmin extends PartialType(CreateAdmin) {
  uid: Admin['uid'];
}
