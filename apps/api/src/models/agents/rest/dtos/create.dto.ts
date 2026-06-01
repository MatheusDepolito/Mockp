import { OmitType } from '@nestjs/swagger';
import { AgentEntity } from '../entity/agent.entity';

export class CreateAgent extends OmitType(AgentEntity, [
  'createdAt',
  'updatedAt',
]) {}
