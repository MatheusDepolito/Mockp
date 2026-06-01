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
import { CreatePropertyFeature } from './dtos/create.dto';
import { PropertyFeatureQueryDto } from './dtos/query.dto';
import { UpdatePropertyFeature } from './dtos/update.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { PropertyFeatureEntity } from './entity/property-feature.entity';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { GetUserType } from 'src/common/types';
import { checkRowLevelPermission } from 'src/common/auth/util';

@ApiTags('slots')
@Controller('slots')
export class PropertyFeaturesController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PropertyFeatureEntity })
  @Post()
  async create(
    @Body() createPropertyFeatureDto: CreatePropertyFeature,
    @GetUser() user: GetUserType,
  ) {
    const garage = await this.prisma.property.findUnique({
      where: { id: createPropertyFeatureDto.propertyId },
      include: { Brokerage: { include: { BrokerageManagers: true } } },
    });
    checkRowLevelPermission(
      user,
      garage.Brokerage.BrokerageManagers.map((manager) => manager.uid),
    );
    return this.prisma.propertyFeature.create({
      data: createPropertyFeatureDto,
    });
  }

  @ApiOkResponse({ type: [PropertyFeatureEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: PropertyFeatureQueryDto) {
    return this.prisma.propertyFeature.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    });
  }

  @ApiOkResponse({ type: PropertyFeatureEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.propertyFeature.findUnique({ where: { id } });
  }

  @ApiOkResponse({ type: PropertyFeatureEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePropertyFeatureDto: UpdatePropertyFeature,
    @GetUser() user: GetUserType,
  ) {
    const slot = await this.prisma.propertyFeature.findUnique({
      where: { id },
      include: {
        Property: {
          include: {
            Brokerage: {
              include: { BrokerageManagers: true },
            },
          },
        },
      },
    });
    checkRowLevelPermission(
      user,
      slot.Property.Brokerage.BrokerageManagers.map((man) => man.uid),
    );
    return this.prisma.propertyFeature.update({
      where: { id },
      data: updatePropertyFeatureDto,
    });
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() user: GetUserType) {
    const slot = await this.prisma.propertyFeature.findUnique({
      where: { id },
      include: {
        Property: {
          include: {
            Brokerage: {
              include: { BrokerageManagers: true },
            },
          },
        },
      },
    });
    checkRowLevelPermission(
      user,
      slot.Property.Brokerage.BrokerageManagers.map((man) => man.uid),
    );
    return this.prisma.propertyFeature.delete({ where: { id } });
  }
}
