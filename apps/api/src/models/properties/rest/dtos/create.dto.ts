import { OmitType } from '@nestjs/swagger';
import { PropertyEntity } from '../entity/property.entity';

export class CreateProperty extends OmitType(PropertyEntity, [
  'createdAt',
  'updatedAt',
  'id',
]) {}
