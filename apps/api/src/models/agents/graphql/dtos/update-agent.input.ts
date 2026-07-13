import { CreateAgentInput } from './create-agent.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Agent } from 'src/common/prisma/client';

@InputType()
export class UpdateAgentInput extends PartialType(CreateAgentInput) {
  uid: Agent['uid'];

  @Field({ nullable: true })
  verified?: boolean;
}
