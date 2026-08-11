import {
  Resolver,
  ResolveField,
  Query,
  Mutation,
  Args,
  Parent,
} from '@nestjs/graphql';
import { InquiriesService } from './inquiries.service';
import { Inquiry } from './entity/inquiry.entity';
import { FindManyInquiryArgs, FindUniqueInquiryArgs } from './dtos/find.args';
import { CreateInquiryInput } from './dtos/create-inquiry.input';
import { UpdateInquiryInput } from './dtos/update-inquiry.input';
import { checkRowLevelPermission } from 'src/common/auth/util';
import { GetUserType } from 'src/common/types';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Property } from 'src/models/properties/graphql/entity/property.entity';
import { Customer } from 'src/models/customers/graphql/entity/customer.entity';
import { AgentAssignment } from 'src/models/agent-assignments/graphql/entity/agent-assignment.entity';
import { AggregateCountOutput } from 'src/common/dtos/common.input';
import { InquiryWhereInput } from './dtos/where.args';
import { InquiryTimeline } from 'src/models/inquiry-timelines/graphql/entity/inquiry-timeline.entity';
import { BadRequestException, HttpStatus } from '@nestjs/common';
import { ErrorCodes } from 'src/common/errors/error-codes';
import { appException } from 'src/common/errors/error-response';

@Resolver(() => Inquiry)
export class InquiriesResolver {
  constructor(
    private readonly inquiriesService: InquiriesService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Inquiry)
  createInquiry(
    @Args('createInquiryInput') args: CreateInquiryInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.customerId);
    return this.inquiriesService.create(args);
  }

  @AllowAuthenticated('admin')
  @Query(() => [Inquiry], { name: 'inquiries' })
  findAll(@Args() args: FindManyInquiryArgs) {
    return this.inquiriesService.findAll(args);
  }

  @AllowAuthenticated('agent')
  @Query(() => [Inquiry], { name: 'inquiriesForAgent' })
  async inquiriesForAgent(
    @Args() args: FindManyInquiryArgs,
    @GetUser() user: GetUserType,
  ) {
    const agent = await this.prisma.agent.findUnique({
      where: { uid: user.uid },
    });

    if (!agent) {
      throw appException(
        HttpStatus.BAD_REQUEST,
        ErrorCodes.AgentNotFound,
        'You are not an agent.',
      );
    }

    const propertyFilter =
      agent.brokerageId != null
        ? { brokerageId: { equals: agent.brokerageId } }
        : { responsibleAgentId: { equals: user.uid } };

    return this.inquiriesService.findAll({
      ...args,
      where: {
        ...args.where,
        Property: { is: propertyFilter },
      },
    });
  }

  @AllowAuthenticated()
  @Query(() => [Inquiry], { name: 'inquiriesForCustomer' })
  inquiriesForCustomer(
    @Args() args: FindManyInquiryArgs,
    @GetUser() user: GetUserType,
  ) {
    return this.inquiriesService.findAll({
      ...args,
      where: { ...args.where, customerId: { equals: user.uid } },
    });
  }

  @AllowAuthenticated('agent', 'brokerageManager', 'admin')
  @Query(() => [Inquiry], { name: 'inquiriesForProperty' })
  async inquiriesForProperty(
    @Args()
    { cursor, distinct, orderBy, skip, take, where }: FindManyInquiryArgs,
    @GetUser() user: GetUserType,
  ) {
    const propertyId = where.propertyId?.equals;
    if (!propertyId) {
      throw new BadRequestException('Pass property id in where.propertyId');
    }
    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
      include: { Brokerage: { include: { BrokerageManagers: true } } },
    });

    if (property.responsibleAgentId !== user.uid) {
      checkRowLevelPermission(
        user,
        property.Brokerage?.BrokerageManagers.map((manager) => manager.uid) ?? [],
      );
    }

    return this.inquiriesService.findAll({
      cursor,
      distinct,
      orderBy,
      skip,
      take,
      where: {
        ...where,
        propertyId: { equals: propertyId },
      },
    });
  }

  @Query(() => AggregateCountOutput, { name: 'inquiriesCount' })
  async inquiriesCount(
    @Args('where', { nullable: true })
    where: InquiryWhereInput,
  ) {
    const inquiryAggregate = await this.prisma.inquiry.aggregate({
      where,
      _count: { _all: true },
    });
    return { count: inquiryAggregate._count._all };
  }

  @Query(() => Inquiry, { name: 'inquiry' })
  findOne(@Args() args: FindUniqueInquiryArgs) {
    return this.inquiriesService.findOne(args);
  }

  @AllowAuthenticated()
  @Mutation(() => Inquiry)
  async updateInquiry(
    @Args('updateInquiryInput') args: UpdateInquiryInput,
    @GetUser() user: GetUserType,
  ) {
    const inquiry = await this.prisma.inquiry.findUnique({
      where: { id: args.id },
    });
    checkRowLevelPermission(user, inquiry.customerId);
    return this.inquiriesService.update(args);
  }

  @AllowAuthenticated()
  @Mutation(() => Inquiry)
  async removeInquiry(
    @Args() args: FindUniqueInquiryArgs,
    @GetUser() user: GetUserType,
  ) {
    const inquiry = await this.prisma.inquiry.findUnique(args);
    checkRowLevelPermission(user, inquiry.customerId);
    return this.inquiriesService.remove(args);
  }

  @ResolveField(() => Property)
  property(@Parent() inquiry: Inquiry) {
    return this.prisma.property.findFirst({
      where: { id: inquiry.propertyId },
    });
  }

  @ResolveField(() => Customer)
  customer(@Parent() inquiry: Inquiry) {
    return this.prisma.customer.findFirst({
      where: { uid: inquiry.customerId },
    });
  }

  @ResolveField(() => [InquiryTimeline])
  inquiryTimeline(@Parent() inquiry: Inquiry) {
    return this.prisma.inquiryTimeline.findMany({
      where: { inquiryId: inquiry.id },
    });
  }

  @ResolveField(() => AgentAssignment, { nullable: true })
  agentAssignment(@Parent() inquiry: Inquiry) {
    return this.prisma.agentAssignment.findFirst({
      where: { inquiryId: inquiry.id },
    });
  }
}
