import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BrokeragesService } from './brokerages.service';
import { Brokerage } from './entity/brokerage.entity';
import {
  FindManyBrokerageArgs,
  FindUniqueBrokerageArgs,
} from './dtos/find.args';
import { CreateBrokerageInput } from './dtos/create-brokerage.input';
import { UpdateBrokerageInput } from './dtos/update-brokerage.input';
import { checkRowLevelPermission } from 'src/common/auth/util';
import { GetUserType } from 'src/common/types';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { BrokerageManager } from 'src/models/brokerage-managers/graphql/entity/brokerage-manager.entity';
import { Property } from 'src/models/properties/graphql/entity/property.entity';

@Resolver(() => Brokerage)
export class BrokeragesResolver {
  constructor(
    private readonly brokeragesService: BrokeragesService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Brokerage)
  createBrokerage(
    @Args('createBrokerageInput') args: CreateBrokerageInput,
    @GetUser() user: GetUserType,
  ) {
    const brokerageManagerId = args.brokerageManagerId;

    checkRowLevelPermission(user, brokerageManagerId);
    return this.brokeragesService.create(args);
  }

  @AllowAuthenticated()
  @Query(() => [Brokerage], { name: 'brokerages' })
  findAll(@Args() args: FindManyBrokerageArgs) {
    return this.brokeragesService.findAll(args);
  }

  @AllowAuthenticated()
  @Query(() => Brokerage)
  myBrokerage(@GetUser() user: GetUserType) {
    return this.prisma.brokerage.findFirst({
      where: { BrokerageManagers: { some: { uid: user.uid } } },
    });
  }

  @Query(() => Brokerage, { name: 'brokerage' })
  findOne(@Args() args: FindUniqueBrokerageArgs) {
    return this.brokeragesService.findOne(args);
  }

  @AllowAuthenticated()
  @Mutation(() => Brokerage)
  async updateBrokerage(
    @Args('updateBrokerageInput') args: UpdateBrokerageInput,
    @GetUser() user: GetUserType,
  ) {
    const brokerage = await this.prisma.brokerage.findUnique({
      where: { id: args.id },
      include: { BrokerageManagers: true },
    });
    checkRowLevelPermission(
      user,
      brokerage.BrokerageManagers.map((man) => man.uid),
    );
    return this.brokeragesService.update(args);
  }

  @AllowAuthenticated()
  @Mutation(() => Brokerage)
  async removeBrokerage(
    @Args() args: FindUniqueBrokerageArgs,
    @GetUser() user: GetUserType,
  ) {
    const brokerage = await this.prisma.brokerage.findUnique({
      ...args,
      include: { BrokerageManagers: true },
    });
    checkRowLevelPermission(
      user,
      brokerage.BrokerageManagers.map((man) => man.uid),
    );
    return this.brokeragesService.remove(args);
  }

  @ResolveField(() => [Property])
  properties(@Parent() brokerage: Brokerage) {
    return this.prisma.property.findMany({
      where: { brokerageId: brokerage.id },
    });
  }

  @ResolveField(() => [BrokerageManager])
  brokerageManagers(@Parent() brokerage: Brokerage) {
    return this.prisma.brokerageManager.findMany({
      where: { brokerageId: brokerage.id },
    });
  }
}
