import { OmitType } from '@nestjs/swagger';
import { BrokerageManagerEntity } from '../entity/brokerage-manager.entity';

export class CreateBrokerageManager extends OmitType(BrokerageManagerEntity, [
  'createdAt',
  'updatedAt',
]) {}
