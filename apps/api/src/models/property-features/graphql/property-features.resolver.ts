import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PropertyFeaturesService } from './property-features.service';
import { PropertyFeature } from './entity/property-feature.entity';
import {
  FindManyPropertyFeatureArgs,
  FindUniquePropertyFeatureArgs,
} from './dtos/find.args';
import { CreatePropertyFeatureInput } from './dtos/create-property-feature.input';
import { UpdatePropertyFeatureInput } from './dtos/update-property-feature.input';
import { checkRowLevelPermission } from 'src/common/auth/util';
import { GetUserType } from 'src/common/types';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Property } from 'src/models/properties/graphql/entity/property.entity';

@Resolver(() => PropertyFeature)
export class PropertyFeaturesResolver {
  constructor(
    private readonly propertyFeaturesService: PropertyFeaturesService,
    private readonly prisma: PrismaService,
  ) {}

  private getAllowedUids(property: {
    responsibleAgentId: string;
    Brokerage?: { BrokerageManagers: { uid: string }[] } | null;
  }) {
    return [
      property.responsibleAgentId,
      ...(property.Brokerage?.BrokerageManagers.map((m) => m.uid) ?? []),
    ];
  }

  @AllowAuthenticated('brokerageManager', 'agent')
  @Mutation(() => PropertyFeature)
  async createPropertyFeature(
    @Args('createPropertyFeatureInput') args: CreatePropertyFeatureInput,
    @GetUser() user: GetUserType,
  ) {
    const property = await this.prisma.property.findUnique({
      where: { id: args.propertyId },
      include: { Brokerage: { include: { BrokerageManagers: true } } },
    });

    checkRowLevelPermission(user, this.getAllowedUids(property));
    return this.propertyFeaturesService.create(args);
  }

  @Query(() => [PropertyFeature], { name: 'propertyFeatures' })
  findAll(@Args() args: FindManyPropertyFeatureArgs) {
    return this.propertyFeaturesService.findAll(args);
  }

  @Query(() => PropertyFeature, { name: 'propertyFeature' })
  findOne(@Args() args: FindUniquePropertyFeatureArgs) {
    return this.propertyFeaturesService.findOne(args);
  }

  @AllowAuthenticated('brokerageManager', 'agent')
  @Mutation(() => PropertyFeature)
  async updatePropertyFeature(
    @Args('updatePropertyFeatureInput') args: UpdatePropertyFeatureInput,
    @GetUser() user: GetUserType,
  ) {
    const feature = await this.prisma.propertyFeature.findUnique({
      where: { id: args.id },
      include: {
        Property: {
          include: {
            Brokerage: { include: { BrokerageManagers: true } },
          },
        },
      },
    });

    checkRowLevelPermission(user, this.getAllowedUids(feature.Property));
    return this.propertyFeaturesService.update(args);
  }

  @AllowAuthenticated('brokerageManager', 'agent')
  @Mutation(() => PropertyFeature)
  async removePropertyFeature(
    @Args() args: FindUniquePropertyFeatureArgs,
    @GetUser() user: GetUserType,
  ) {
    const feature = await this.prisma.propertyFeature.findUnique({
      where: { id: args.where.id },
      include: {
        Property: {
          include: {
            Brokerage: { include: { BrokerageManagers: true } },
          },
        },
      },
    });

    checkRowLevelPermission(user, this.getAllowedUids(feature.Property));
    return this.propertyFeaturesService.remove(args);
  }

  @ResolveField(() => Property)
  property(@Parent() feature: PropertyFeature) {
    return this.prisma.property.findUnique({
      where: { id: feature.propertyId },
    });
  }
}
