import { CreateBrokerageManagerInput } from './create-brokerage-manager.input';
import { InputType, PartialType } from '@nestjs/graphql';
import { BrokerageManager } from 'src/common/prisma/client';

@InputType()
export class UpdateBrokerageManagerInput extends PartialType(
  CreateBrokerageManagerInput,
) {
  uid: BrokerageManager['uid'];
}
