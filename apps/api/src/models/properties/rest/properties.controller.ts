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
import { CreateProperty } from './dtos/create.dto';
import { PropertyQueryDto } from './dtos/query.dto';
import { UpdateProperty } from './dtos/update.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { PropertyEntity } from './entity/property.entity';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { GetUserType } from 'src/common/types';
import { checkRowLevelPermission } from 'src/common/auth/util';

@ApiTags('properties')
@Controller('properties')
export class PropertiesController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PropertyEntity })
  @Post()
  async create(
    @Body() createPropertyDto: CreateProperty,
    @GetUser() user: GetUserType,
  ) {
    const brokerage = await this.prisma.brokerage.findUnique({
      where: { id: createPropertyDto.brokerageId },
      include: { BrokerageManagers: true },
    });
    checkRowLevelPermission(
      user,
      brokerage.BrokerageManagers.map((manager) => manager.uid),
    );
    return this.prisma.property.create({ data: createPropertyDto });
  }

  @ApiOkResponse({ type: [PropertyEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: PropertyQueryDto) {
    return this.prisma.property.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    });
  }

  @ApiOkResponse({ type: PropertyEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.property.findUnique({ where: { id } });
  }

  @ApiOkResponse({ type: PropertyEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePropertyDto: UpdateProperty,
    @GetUser() user: GetUserType,
  ) {
    const property = await this.prisma.property.findUnique({
      where: { id },
      include: { Brokerage: { include: { BrokerageManagers: true } } },
    });
    checkRowLevelPermission(
      user,
      property.Brokerage.BrokerageManagers.map((manager) => manager.uid),
    );

    return this.prisma.property.update({
      where: { id },
      data: updatePropertyDto,
    });
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() user: GetUserType) {
    const property = await this.prisma.property.findUnique({
      where: { id },
      include: { Brokerage: { include: { BrokerageManagers: true } } },
    });
    checkRowLevelPermission(
      user,
      property.Brokerage.BrokerageManagers.map((manager) => manager.uid),
    );
    return this.prisma.property.delete({ where: { id } });
  }
}
