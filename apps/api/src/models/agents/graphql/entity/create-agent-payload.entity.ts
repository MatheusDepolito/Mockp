import { Field, ObjectType } from '@nestjs/graphql';
import { Agent } from './agent.entity';

@ObjectType()
export class CreateAgentPayload {
  @Field(() => Agent)
  agent: Agent;

  @Field()
  email: string;

  @Field()
  temporaryPassword: string;
}
