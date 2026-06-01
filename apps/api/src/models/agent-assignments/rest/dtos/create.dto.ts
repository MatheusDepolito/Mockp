import { OmitType } from '@nestjs/swagger';
import { AgentAssignmentEntity } from '../entity/agent-assignment.entity';

export class CreateAgentAssignment extends OmitType(AgentAssignmentEntity, [
  'createdAt',
  'updatedAt',
]) {}
