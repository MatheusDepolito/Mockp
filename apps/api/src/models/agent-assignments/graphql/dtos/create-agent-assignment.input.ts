import { InputType, OmitType } from '@nestjs/graphql';
import { AgentAssignment } from '../entity/agent-assignment.entity';

@InputType()
export class CreateAgentAssignmentInput extends OmitType(
  AgentAssignment,
  ['createdAt', 'updatedAt'],
  InputType,
) {}
