import { PartialType } from '@nestjs/swagger';
import { CreateCustomer } from './create.dto';
import { Customer } from 'src/common/prisma/client';

export class UpdateCustomer extends PartialType(CreateCustomer) {
  uid: Customer['uid'];
}
