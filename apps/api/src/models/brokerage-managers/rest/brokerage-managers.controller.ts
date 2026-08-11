import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBrokerageManager } from './dtos/create.dto';
import { BrokerageManagerQueryDto } from './dtos/query.dto';
import { UpdateBrokerageManager } from './dtos/update.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { BrokerageManagerEntity } from './entity/brokerage-manager.entity';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { GetUserType } from 'src/common/types';
import { checkRowLevelPermission } from 'src/common/auth/util';

@ApiTags('brokerage-managers')
@Controller('brokerage-managers')
export class BrokerageManagersController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: BrokerageManagerEntity })
  @Post()
  create(
    @Body() createBrokerageManagerDto: CreateBrokerageManager,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, createBrokerageManagerDto.uid);
    return this.prisma.brokerageManager.create({
      data: createBrokerageManagerDto,
    });
  }

  @ApiOkResponse({ type: [BrokerageManagerEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: BrokerageManagerQueryDto) {
    return this.prisma.brokerageManager.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    });
  }

  @ApiOkResponse({ type: BrokerageManagerEntity })
  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    return this.prisma.brokerageManager.findUnique({ where: { uid } });
  }

  @ApiOkResponse({ type: BrokerageManagerEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':uid')
  async update(
    @Param('uid') uid: string,
    @Body() updateBrokerageManagerDto: UpdateBrokerageManager,
    @GetUser() user: GetUserType,
  ) {
    const manager = await this.prisma.brokerageManager.findUnique({
      where: { uid },
    });
    checkRowLevelPermission(user, manager.uid);
    return this.prisma.brokerageManager.update({
      where: { uid },
      data: updateBrokerageManagerDto,
    });
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':uid')
  async remove(@Param('uid') uid: string, @GetUser() user: GetUserType) {
    const manager = await this.prisma.brokerageManager.findUnique({
      where: { uid },
    });
    checkRowLevelPermission(user, manager.uid);
    return this.prisma.brokerageManager.delete({ where: { uid } });
  }
}
