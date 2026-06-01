import { Injectable } from '@nestjs/common';
import {
  FindManyAgentAssignmentArgs,
  FindUniqueAgentAssignmentArgs,
} from './dtos/find.args';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateAgentAssignmentInput } from './dtos/create-agent-assignment.input';
import { UpdateAgentAssignmentInput } from './dtos/update-agent-assignment.input';

@Injectable()
export class AgentAssignmentsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createAgentAssignmentInput: CreateAgentAssignmentInput) {
    return this.prisma.agentAssignment.create({
      data: createAgentAssignmentInput,
    });
  }

  findAll(args: FindManyAgentAssignmentArgs) {
    return this.prisma.agentAssignment.findMany(args);
  }

  findOne(args: FindUniqueAgentAssignmentArgs) {
    return this.prisma.agentAssignment.findUnique(args);
  }

  update(updateAgentAssignmentInput: UpdateAgentAssignmentInput) {
    const { inquiryId, ...data } = updateAgentAssignmentInput;
    return this.prisma.agentAssignment.update({
      where: { inquiryId },
      data: data,
    });
  }

  remove(args: FindUniqueAgentAssignmentArgs) {
    return this.prisma.agentAssignment.delete(args);
  }
}
