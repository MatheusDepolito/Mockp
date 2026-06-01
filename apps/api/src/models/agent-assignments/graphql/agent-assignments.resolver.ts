import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AgentAssignmentsService } from './agent-assignments.service';
import { AgentAssignment } from './entity/agent-assignment.entity';
import {
  FindManyAgentAssignmentArgs,
  FindUniqueAgentAssignmentArgs,
} from './dtos/find.args';
import { CreateAgentAssignmentInput } from './dtos/create-agent-assignment.input';
import { UpdateAgentAssignmentInput } from './dtos/update-agent-assignment.input';
import { checkRowLevelPermission } from 'src/common/auth/util';
import { GetUserType } from 'src/common/types';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Agent } from 'src/models/agents/graphql/entity/agent.entity';

@Resolver(() => AgentAssignment)
export class AgentAssignmentsResolver {
  constructor(
    private readonly agentAssignmentsService: AgentAssignmentsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => AgentAssignment)
  createAgentAssignment(
    @Args('createAgentAssignmentInput') args: CreateAgentAssignmentInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, [args.assignedAgentId, args.assignedAgentId]);
    return this.agentAssignmentsService.create(args);
  }

  @Query(() => [AgentAssignment], { name: 'agentAssignments' })
  findAll(@Args() args: FindManyAgentAssignmentArgs) {
    return this.agentAssignmentsService.findAll(args);
  }

  @Query(() => AgentAssignment, { name: 'agentAssignment' })
  findOne(@Args() args: FindUniqueAgentAssignmentArgs) {
    return this.agentAssignmentsService.findOne(args);
  }

  @AllowAuthenticated()
  @Mutation(() => AgentAssignment)
  async updateAgentAssignment(
    @Args('updateAgentAssignmentInput') args: UpdateAgentAssignmentInput,
    @GetUser() user: GetUserType,
  ) {
    const agentAssignment = await this.prisma.agentAssignment.findUnique({
      where: { inquiryId: args.inquiryId },
    });
    checkRowLevelPermission(user, [
      agentAssignment.assignedAgentId,
      agentAssignment.assignedAgentId,
    ]);
    return this.agentAssignmentsService.update(args);
  }

  @AllowAuthenticated()
  @Mutation(() => AgentAssignment)
  async removeAgentAssignment(
    @Args() args: FindUniqueAgentAssignmentArgs,
    @GetUser() user: GetUserType,
  ) {
    const agentAssignment = await this.prisma.agentAssignment.findUnique(args);
    checkRowLevelPermission(user, [
      agentAssignment.assignedAgentId,
      agentAssignment.assignedAgentId,
    ]);
    return this.agentAssignmentsService.remove(args);
  }

  @ResolveField(() => Agent, { nullable: true })
  assignedAgent(@Parent() parent: AgentAssignment) {
    if (!parent.assignedAgentId) {
      return null;
    }
    return this.prisma.agent.findUnique({
      where: { uid: parent.assignedAgentId },
    });
  }
}
