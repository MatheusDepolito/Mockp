import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ValetsService } from './valets.service';
import { Valet } from './entity/valet.entity';
import { FindManyValetArgs, FindUniqueValetArgs } from './dtos/find.args';
import { CreateValetInput } from './dtos/create-valet.input';
import { UpdateValetInput } from './dtos/update-valet.input';
import { checkRowLevelPermission } from 'src/common/auth/util';
import { GetUserType } from 'src/common/types';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Company } from 'src/models/companies/graphql/entity/company.entity';
import { BookingTimeline } from 'src/models/booking-timelines/graphql/entity/booking-timeline.entity';

@Resolver(() => Valet)
export class ValetsResolver {
  constructor(
    private readonly valetsService: ValetsService,
    private readonly prisma: PrismaService,
  ) {}

  @AllowAuthenticated()
  @Mutation(() => Valet)
  createValet(
    @Args('createValetInput') args: CreateValetInput,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, args.uid);
    return this.valetsService.create(args);
  }

  @Query(() => [Valet], { name: 'valets' })
  findAll(@Args() args: FindManyValetArgs) {
    return this.valetsService.findAll(args);
  }

  @Query(() => Valet, { name: 'valet' })
  findOne(@Args() args: FindUniqueValetArgs) {
    return this.valetsService.findOne(args);
  }

  @AllowAuthenticated()
  @Mutation(() => Valet)
  async updateValet(
    @Args('updateValetInput') args: UpdateValetInput,
    @GetUser() user: GetUserType,
  ) {
    const valet = await this.prisma.valet.findUnique({
      where: { uid: args.uid },
    });
    checkRowLevelPermission(user, valet.uid);
    return this.valetsService.update(args);
  }

  @AllowAuthenticated()
  @Mutation(() => Valet)
  async removeValet(
    @Args() args: FindUniqueValetArgs,
    @GetUser() user: GetUserType,
  ) {
    const valet = await this.prisma.valet.findUnique(args);
    checkRowLevelPermission(user, valet.uid);
    return this.valetsService.remove(args);
  }
}
