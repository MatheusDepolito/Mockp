import { CreateAgentInput } from './create-agent.input';
import { InputType, PartialType } from '@nestjs/graphql';
import { Agent } from 'src/common/prisma/client';

@InputType()
export class UpdateAgentInput extends PartialType(CreateAgentInput) {
  uid: Agent['uid'];
}
