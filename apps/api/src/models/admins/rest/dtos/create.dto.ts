import { AdminEntity } from '../entity/admin.entity';
import { OmitType } from '@nestjs/swagger';

export class CreateAdmin extends OmitType(AdminEntity, [
  'createdAt',
  'updatedAt',
]) {}
