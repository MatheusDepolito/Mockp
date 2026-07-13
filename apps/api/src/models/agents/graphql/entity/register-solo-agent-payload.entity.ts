import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/models/users/graphql/entity/user.entity';
import { Agent } from './agent.entity';

@ObjectType()
export class RegisterSoloAgentPayload {
  @Field()
  token: string;

  @Field(() => User)
  user: User;

  @Field(() => Agent)
  agent: Agent;
}
