import { Field, Float, InputType, PickType } from '@nestjs/graphql';
import { Inquiry } from '../entity/inquiry.entity';
import { Property } from 'src/common/prisma/client';
import { CreateAgentAssignmentInput } from 'src/models/agent-assignments/graphql/dtos/create-agent-assignment.input';
import { OmitType } from '@nestjs/graphql';

@InputType()
export class CreateAgentAssignmentInputWithoutInquiryId extends OmitType(
  CreateAgentAssignmentInput,
  ['inquiryId'],
  InputType,
) {}

@InputType()
export class CreateInquiryInput extends PickType(
  Inquiry,
  [
    'customerId',
    'endTime',
    'startTime',
    'contactNotes',
    'phoneNumber',
    'listPriceAtInquiry',
    'totalPrice',
  ],
  InputType,
) {
  @Field(() => Float)
  propertyId: Property['id'];
  agentAssignment?: CreateAgentAssignmentInputWithoutInquiryId;
}
