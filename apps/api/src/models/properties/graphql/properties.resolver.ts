import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PropertiesService } from './properties.service';
import { Property, PropertyFeatureTypeCount } from './entity/property.entity';
import { FindManyPropertyArgs, FindUniquePropertyArgs } from './dtos/find.args';
import { CreatePropertyInput } from './dtos/create-property.input';
import { UpdatePropertyInput } from './dtos/update-property.input';
import { checkRowLevelPermission } from 'src/common/auth/util';
import { GetUserType } from 'src/common/types';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { PropertyFeature } from 'src/models/property-features/graphql/entity/property-feature.entity';
import { Address } from 'src/models/addresses/graphql/entity/address.entity';
import { Brokerage } from 'src/models/brokerages/graphql/entity/brokerage.entity';
import { Verification } from 'src/models/verifications/graphql/entity/verification.entity';
import { DateFilterInput, PropertyFilter } from './dtos/search-filter.input';
import {
  AggregateCountOutput,
  LocationFilterInput,
} from 'src/common/dtos/common.input';
import { PropertyFeatureWhereInput } from 'src/models/property-features/graphql/dtos/where.args';
import { BadRequestException } from '@nestjs/common';
import { PropertyWhereInput } from './dtos/where.args';

@Resolver(() => Property)
export class PropertiesResolver {
  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated('brokerageManager', 'agent')
  @Mutation(() => Property)
  async createProperty(
    @Args('createPropertyInput') args: CreatePropertyInput,
    @GetUser() user: GetUserType,
  ) {
    const agent = await this.prisma.agent.findUnique({
      where: { uid: user.uid },
    });
    const manager = await this.prisma.brokerageManager.findUnique({
      where: { uid: user.uid },
      include: { Brokerage: true },
    });

    let brokerageId = args.brokerageId;
    let responsibleAgentId = args.responsibleAgentId;

    if (agent) {
      responsibleAgentId = agent.uid;
      brokerageId = brokerageId ?? agent.brokerageId ?? undefined;
    } else if (manager?.Brokerage?.id) {
      brokerageId = manager.Brokerage.id;
      if (!responsibleAgentId) {
        throw new BadRequestException(
          'responsibleAgentId is required when creating a property as brokerage manager.',
        );
      }
    } else {
      throw new BadRequestException(
        'Only agents or brokerage managers can create properties.',
      );
    }

    if (brokerageId && responsibleAgentId) {
      const responsibleAgent = await this.prisma.agent.findFirst({
        where: {
          uid: responsibleAgentId,
          brokerageId,
        },
      });
      if (!responsibleAgent) {
        throw new BadRequestException('Corretor não pertence à corretora.');
      }
    }

    return this.propertiesService.create({
      ...args,
      brokerageId,
      responsibleAgentId,
    });
  }

  @AllowAuthenticated('agent')
  @Query(() => [Property], { name: 'myPropertiesAsAgent' })
  async myPropertiesAsAgent(
    @Args() args: FindManyPropertyArgs,
    @GetUser() user: GetUserType,
  ) {
    await this.prisma.agent.findUniqueOrThrow({
      where: { uid: user.uid },
    });
    return this.propertiesService.findAll({
      ...args,
      where: {
        ...args.where,
        responsibleAgentId: { equals: user.uid },
      },
    });
  }

  @AllowAuthenticated('agent')
  @Query(() => AggregateCountOutput, { name: 'myPropertiesAsAgentCount' })
  async myPropertiesAsAgentCount(@GetUser() user: GetUserType) {
    const count = await this.prisma.property.count({
      where: { responsibleAgentId: user.uid },
    });
    return { count };
  }

  @Query(() => [Property], { name: 'properties' })
  findAll(@Args() args: FindManyPropertyArgs) {
    return this.propertiesService.findAll(args);
  }

  @Query(() => Property, { name: 'property' })
  findOne(@Args() args: FindUniquePropertyArgs) {
    return this.propertiesService.findOne(args);
  }

  @Query(() => [Property], { name: 'searchProperties' })
  async searchProperties(
    @Args('dateFilter') dateFilter: DateFilterInput,
    @Args('locationFilter') locationFilter: LocationFilterInput,
    @Args('featuresFilter', { nullable: true })
    featuresFilter: PropertyFeatureWhereInput,
    @Args('propertyFilter', { nullable: true }) args: PropertyFilter,
  ) {
    const { start, end } = dateFilter;
    const { ne_lat, ne_lng, sw_lat, sw_lng } = locationFilter;

    let startDate = new Date(start);
    let endDate = new Date(end);
    const currentDate = new Date();

    if (startDate.getTime() < currentDate.getTime()) {
      startDate = new Date();
      endDate = new Date(
        startDate.getTime() + (endDate.getTime() - new Date(start).getTime()),
      );
    }

    if (startDate.getTime() > endDate.getTime()) {
      throw new BadRequestException(
        'Start time should be earlier than the end time.',
      );
    }

    const { where = {}, ...propertyFilters } = args || {};

    return this.prisma.property.findMany({
      ...propertyFilters,
      where: {
        ...where,
        Address: {
          lat: { lte: ne_lat, gte: sw_lat },
          lng: { lte: ne_lng, gte: sw_lng },
        },
        ...(featuresFilter
          ? {
              PropertyFeatures: {
                some: featuresFilter,
              },
            }
          : {}),
        Inquiries: {
          none: {
            OR: [
              { startTime: { lt: endDate }, endTime: { gt: startDate } },
              { startTime: { gt: startDate }, endTime: { lt: endDate } },
            ],
          },
        },
      },
    });
  }

  @ResolveField(() => [PropertyFeatureTypeCount])
  async featureCounts(@Parent() property: Property) {
    const features = await this.prisma.propertyFeature.findMany({
      where: { propertyId: property.id },
    });

    const totals = new Map<string, number>();
    for (const feature of features) {
      totals.set(
        feature.type,
        (totals.get(feature.type) ?? 0) + feature.quantity,
      );
    }

    return Array.from(totals.entries()).map(([type, count]) => ({
      type,
      count,
    }));
  }

  @AllowAuthenticated()
  @Mutation(() => Property)
  async updateProperty(
    @Args('updatePropertyInput') args: UpdatePropertyInput,
    @GetUser() user: GetUserType,
  ) {
    const property = await this.prisma.property.findUnique({
      where: { id: args.id },
      include: {
        Brokerage: { include: { BrokerageManagers: true } },
        ResponsibleAgent: true,
      },
    });

    const allowedUids = [
      property?.responsibleAgentId,
      ...(property?.Brokerage?.BrokerageManagers.map((m) => m.uid) ?? []),
    ].filter(Boolean) as string[];

    checkRowLevelPermission(user, allowedUids);
    return this.propertiesService.update(args);
  }

  @AllowAuthenticated()
  @Mutation(() => Property)
  async removeProperty(
    @Args() args: FindUniquePropertyArgs,
    @GetUser() user: GetUserType,
  ) {
    const property = await this.prisma.property.findUnique({
      where: { id: args.where.id },
      include: {
        Brokerage: { include: { BrokerageManagers: true } },
      },
    });

    const allowedUids = [
      property?.responsibleAgentId,
      ...(property?.Brokerage?.BrokerageManagers.map((m) => m.uid) ?? []),
    ].filter(Boolean) as string[];

    checkRowLevelPermission(user, allowedUids);
    return this.propertiesService.remove(args);
  }

  @ResolveField(() => Verification, { nullable: true })
  async verification(@Parent() parent: Property) {
    return this.prisma.verification.findUnique({
      where: { propertyId: parent.id },
    });
  }

  @ResolveField(() => Brokerage, { nullable: true })
  brokerage(@Parent() property: Property) {
    if (!property.brokerageId) return null;
    return this.prisma.brokerage.findFirst({
      where: { id: property.brokerageId },
    });
  }

  @ResolveField(() => Address, { nullable: true })
  address(@Parent() property: Property) {
    return this.prisma.address.findFirst({
      where: { propertyId: property.id },
    });
  }

  @ResolveField(() => [PropertyFeature])
  propertyFeatures(@Parent() property: Property) {
    return this.prisma.propertyFeature.findMany({
      where: { propertyId: property.id },
    });
  }

  @Query(() => AggregateCountOutput, { name: 'propertiesCount' })
  async propertiesCount(
    @Args('where', { nullable: true }) where: PropertyWhereInput,
  ) {
    const properties = await this.prisma.property.aggregate({
      _count: { _all: true },
      where,
    });
    return { count: properties._count._all };
  }
}
