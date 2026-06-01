import { Field, Float, ObjectType } from '@nestjs/graphql';
import { AgentAssignment as AgentAssignmentType } from 'src/common/prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@ObjectType()
export class AgentAssignment
  implements RestrictProperties<AgentAssignment, AgentAssignmentType>
{
  @Field(() => Float)
  inquiryId: number;
  createdAt: Date;
  updatedAt: Date;
  @Field({ nullable: true })
  visitLat: number;
  @Field({ nullable: true })
  visitLng: number;
  @Field({ nullable: true })
  assignedAgentId: string;
}
