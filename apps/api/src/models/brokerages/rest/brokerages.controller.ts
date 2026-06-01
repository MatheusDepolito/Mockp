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
import { CreateBrokerage } from './dtos/create.dto';
import { BrokerageQueryDto } from './dtos/query.dto';
import { UpdateBrokerage } from './dtos/update.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { BrokerageEntity } from './entity/brokerage.entity';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { GetUserType } from 'src/common/types';
import { checkRowLevelPermission } from 'src/common/auth/util';

@ApiTags('companies')
@Controller('companies')
export class BrokeragesController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: BrokerageEntity })
  @Post()
  create(@Body() createBrokerageDto: CreateBrokerage) {
    return this.prisma.brokerage.create({ data: createBrokerageDto });
  }

  @ApiOkResponse({ type: [BrokerageEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: BrokerageQueryDto) {
    return this.prisma.brokerage.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    });
  }

  @ApiOkResponse({ type: BrokerageEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.brokerage.findUnique({ where: { id } });
  }

  @ApiOkResponse({ type: BrokerageEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBrokerageDto: UpdateBrokerage,
    @GetUser() user: GetUserType,
  ) {
    const company = await this.prisma.brokerage.findUnique({
      where: { id },
      include: { BrokerageManagers: true },
    });
    checkRowLevelPermission(
      user,
      company.BrokerageManagers.map((manager) => manager.uid),
    );
    return this.prisma.brokerage.update({
      where: { id },
      data: updateBrokerageDto,
    });
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() user: GetUserType) {
    const company = await this.prisma.brokerage.findUnique({
      where: { id },
      include: { BrokerageManagers: true },
    });
    checkRowLevelPermission(
      user,
      company.BrokerageManagers.map((manager) => manager.uid),
    );
    return this.prisma.brokerage.delete({ where: { id } });
  }
}
