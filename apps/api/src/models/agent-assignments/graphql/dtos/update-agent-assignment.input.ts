import { CreateAgentAssignmentInput } from './create-agent-assignment.input';
import { Field, Float, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAgentAssignmentInput extends PartialType(
  CreateAgentAssignmentInput,
) {
  @Field(() => Float)
  inquiryId: number;
}
