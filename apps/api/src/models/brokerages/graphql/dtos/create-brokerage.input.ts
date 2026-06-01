import { InputType, PickType } from '@nestjs/graphql';
import { Brokerage } from '../entity/brokerage.entity';

@InputType()
export class CreateBrokerageInput extends PickType(
  Brokerage,
  ['displayName', 'description'],
  InputType,
) {
  brokerageManagerId: string;
  managerName?: string;
}
