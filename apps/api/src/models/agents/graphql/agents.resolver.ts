import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AgentsService } from './agents.service';
import { Agent } from './entity/agent.entity';
import { CreateAgentPayload } from './entity/create-agent-payload.entity';
import { FindManyAgentArgs, FindUniqueAgentArgs } from './dtos/find.args';
import { CreateAgentInput } from './dtos/create-agent.input';
import { UpdateAgentInput } from './dtos/update-agent.input';
import { checkRowLevelPermission } from 'src/common/auth/util';
import { GetUserType } from 'src/common/types';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { AgentWhereInput } from './dtos/where.args';
import { Inquiry } from 'src/models/inquiries/graphql/entity/inquiry.entity';
import { PaginationInput } from 'src/common/dtos/common.input';
import { InquiryStatus } from 'src/common/prisma/client';
import { BadGatewayException } from '@nestjs/common';

@Resolver(() => Agent)
export class AgentsResolver {
  constructor(
    private readonly valetsService: AgentsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated('brokerageManager')
  @Mutation(() => CreateAgentPayload)
  async createAgent(
    @Args('createAgentInput') args: CreateAgentInput,
    @GetUser() user: GetUserType,
  ) {
    const company = await this.prisma.brokerage.findFirst({
      where: { BrokerageManagers: { some: { uid: user.uid } } },
    });

    if (!company) {
      throw new BadGatewayException('You do not have a company.');
    }
    return this.valetsService.createWithAccount({
      ...args,
      brokerageId: company.id,
    });
  }

  @Query(() => [Agent], { name: 'valets' })
  findAll(@Args() args: FindManyAgentArgs) {
    return this.valetsService.findAll(args);
  }

  @AllowAuthenticated()
  @Mutation(() => Inquiry)
  async assignAgent(
    @Args('inquiryId') inquiryId: number,
    @Args('status') status: InquiryStatus,
    @GetUser() user: GetUserType,
  ) {
    const booking = await this.prisma.inquiry.findUnique({
      where: { id: inquiryId },
      select: {
        Property: {
          select: {
            Brokerage: { select: { BrokerageManagers: true, Agents: true } },
          },
        },
      },
    });

    checkRowLevelPermission(user, [
      ...booking.Property.Brokerage.BrokerageManagers.map(
        (manager) => manager.uid,
      ),
      ...booking.Property.Brokerage.Agents.map((valet) => valet.uid),
    ]);

    const [updatedInquiry, bookingTimeline] = await this.prisma.$transaction([
      this.prisma.inquiry.update({
        where: { id: inquiryId },
        data: {
          status,
          ...(status === InquiryStatus.VISIT_SCHEDULED && {
            AgentAssignment: {
              update: { assignedAgentId: user.uid },
            },
          }),
        },
      }),
      this.prisma.inquiryTimeline.create({
        data: {
          inquiryId,
          agentId: user.uid,
          status,
        },
      }),
    ]);

    return updatedInquiry;
  }

  @AllowAuthenticated('brokerageManager', 'admin')
  @Query(() => [Agent], { name: 'companyAgents' })
  async companyAgents(
    @Args() args: FindManyAgentArgs,
    @GetUser() user: GetUserType,
  ) {
    const company = await this.prisma.brokerage.findFirst({
      where: { BrokerageManagers: { some: { uid: user.uid } } },
    });
    return this.valetsService.findAll({
      ...args,
      where: { ...args.where, brokerageId: { equals: company.id } },
    });
  }

  @AllowAuthenticated()
  @Query(() => Number)
  async companyAgentsTotal(
    @Args('where', { nullable: true }) where: AgentWhereInput,
    @GetUser() user: GetUserType,
  ) {
    const company = await this.prisma.brokerage.findFirst({
      where: { BrokerageManagers: { some: { uid: user.uid } } },
    });

    return this.prisma.agent.count({
      where: { ...where, brokerageId: { equals: company.id } },
    });
  }

  @Query(() => Agent, { name: 'agent' })
  findOne(@Args() args: FindUniqueAgentArgs) {
    return this.valetsService.findOne(args);
  }

  @AllowAuthenticated()
  @Query(() => Agent, { name: 'valetMe', nullable: true })
  valetMe(@GetUser() user: GetUserType) {
    return this.valetsService.findOne({ where: { uid: user.uid } });
  }

  @AllowAuthenticated('agent')
  @Query(() => [Inquiry], { name: 'valetPickups' })
  async valetPickups(
    @Args() { skip, take }: PaginationInput,
    @GetUser() user: GetUserType,
  ) {
    const valet = await this.valetsService.validAgent(user.uid);
    return this.prisma.inquiry.findMany({
      skip,
      take,
      where: {
        Property: { brokerageId: valet.brokerageId },
        AgentAssignment: {
          visitLat: { not: undefined },
          assignedAgentId: null,
        },
      },
    });
  }

  @AllowAuthenticated()
  @Query(() => Number)
  async valetPickupsTotal(@GetUser() user: GetUserType) {
    const valet = await this.valetsService.validAgent(user.uid);
    return this.prisma.inquiry.count({
      where: {
        Property: { brokerageId: valet.brokerageId },
        AgentAssignment: {
          visitLat: { not: undefined },
          assignedAgentId: null,
        },
      },
    });
  }

  @AllowAuthenticated()
  @Query(() => [Inquiry], { name: 'valetDrops' })
  async valetDrops(
    @Args() { skip, take }: PaginationInput,
    @GetUser() user: GetUserType,
  ) {
    const valet = await this.valetsService.validAgent(user.uid);

    return this.prisma.inquiry.findMany({
      skip,
      take,
      where: {
        Property: { brokerageId: valet.brokerageId },
        AgentAssignment: {
          visitLat: { not: null },
          assignedAgentId: null,
        },
      },
    });
  }

  @AllowAuthenticated()
  @Query(() => Number)
  async valetDropsTotal(@GetUser() user: GetUserType) {
    const valet = await this.valetsService.validAgent(user.uid);

    return this.prisma.inquiry.count({
      where: {
        Property: { brokerageId: valet.brokerageId },
        AgentAssignment: {
          visitLat: { not: null },
          assignedAgentId: null,
        },
      },
    });
  }

  @AllowAuthenticated()
  @Mutation(() => Agent)
  async updateAgent(
    @Args('updateAgentInput') args: UpdateAgentInput,
    @GetUser() user: GetUserType,
  ) {
    const valet = await this.prisma.agent.findUnique({
      where: { uid: args.uid },
    });
    checkRowLevelPermission(user, valet.uid);
    return this.valetsService.update(args);
  }

  @AllowAuthenticated()
  @Mutation(() => Agent)
  async removeAgent(
    @Args() args: FindUniqueAgentArgs,
    @GetUser() user: GetUserType,
  ) {
    const valet = await this.prisma.agent.findUnique(args);
    checkRowLevelPermission(user, valet.uid);
    return this.valetsService.remove(args);
  }
}
