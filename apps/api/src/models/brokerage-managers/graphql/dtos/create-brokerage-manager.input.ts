import { InputType, PickType } from '@nestjs/graphql';
import { BrokerageManager } from '../entity/brokerage-manager.entity';

@InputType()
export class CreateBrokerageManagerInput extends PickType(
  BrokerageManager,
  ['uid', 'displayName'],
  InputType,
) {}
