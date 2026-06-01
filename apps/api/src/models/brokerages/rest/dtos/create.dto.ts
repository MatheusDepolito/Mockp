import { OmitType } from '@nestjs/swagger';
import { BrokerageEntity } from '../entity/brokerage.entity';

export class CreateBrokerage extends OmitType(BrokerageEntity, [
  'createdAt',
  'updatedAt',
  'id',
]) {}
