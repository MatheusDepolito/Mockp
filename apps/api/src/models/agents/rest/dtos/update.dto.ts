import { PartialType } from '@nestjs/swagger';
import { CreateAgent } from './create.dto';
import { Agent } from 'src/common/prisma/client';

export class UpdateAgent extends PartialType(CreateAgent) {
  uid: Agent['uid'];
}
