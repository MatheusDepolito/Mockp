import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BrokerageManagersService } from './brokerage-managers.service';
import { BrokerageManager } from './entity/brokerage-manager.entity';
import {
  FindManyBrokerageManagerArgs,
  FindUniqueBrokerageManagerArgs,
} from './dtos/find.args';
import { CreateBrokerageManagerInput } from './dtos/create-brokerage-manager.input';
import { UpdateBrokerageManagerInput } from './dtos/update-brokerage-manager.input';
import { checkRowLevelPermission } from 'src/common/auth/util';
import { GetUserType } from 'src/common/types';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Brokerage } from 'src/models/brokerages/graphql/entity/brokerage.entity';

@Resolver(() => BrokerageManager)
export class BrokerageManagersResolver {
  constructor(
    private readonly managersService: BrokerageManagersService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => BrokerageManager)
  createBrokerageManager(
    @Args('createBrokerageManagerInput') args: CreateBrokerageManagerInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.uid);
    return this.managersService.create(args);
  }

  @Query(() => [BrokerageManager], { name: 'managers' })
  findAll(@Args() args: FindManyBrokerageManagerArgs) {
    return this.managersService.findAll(args);
  }

  @Query(() => BrokerageManager, { name: 'brokerageManager' })
  findOne(@Args() args: FindUniqueBrokerageManagerArgs) {
    return this.managersService.findOne(args);
  }

  @AllowAuthenticated()
  @Mutation(() => BrokerageManager)
  async updateBrokerageManager(
    @Args('updateBrokerageManagerInput') args: UpdateBrokerageManagerInput,
    @GetUser() user: GetUserType,
  ) {
    const manager = await this.prisma.brokerageManager.findUnique({
      where: { uid: args.uid },
    });
    checkRowLevelPermission(user, manager.uid);
    return this.managersService.update(args);
  }

  @AllowAuthenticated()
  @Mutation(() => BrokerageManager)
  async removeBrokerageManager(
    @Args() args: FindUniqueBrokerageManagerArgs,
    @GetUser() user: GetUserType,
  ) {
    const manager = await this.prisma.brokerageManager.findUnique(args);
    checkRowLevelPermission(user, manager.uid);
    return this.managersService.remove(args);
  }

  @ResolveField(() => Brokerage, { nullable: true })
  brokerage(@Parent() manager: BrokerageManager) {
    return this.prisma.brokerage.findUnique({
      where: { id: manager.brokerageId },
    });
  }
}
