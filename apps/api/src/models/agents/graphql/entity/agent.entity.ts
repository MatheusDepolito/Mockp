import { Field, ObjectType } from '@nestjs/graphql';
import { Agent as AgentType } from 'src/common/prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@ObjectType()
export class Agent implements RestrictProperties<Agent, AgentType> {
  uid: string;
  createdAt: Date;
  updatedAt: Date;
  @Field({ nullable: true })
  image: string;
  displayName: string;
  @Field({ nullable: true })
  brokerageId: number;
  licenseID: string;
  verified: boolean;
}
