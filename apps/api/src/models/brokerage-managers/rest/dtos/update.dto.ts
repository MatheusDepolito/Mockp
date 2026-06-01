import { PartialType } from '@nestjs/swagger';
import { CreateBrokerageManager } from './create.dto';
import { BrokerageManager } from 'src/common/prisma/client';

export class UpdateBrokerageManager extends PartialType(
  CreateBrokerageManager,
) {
  uid: BrokerageManager['uid'];
}
