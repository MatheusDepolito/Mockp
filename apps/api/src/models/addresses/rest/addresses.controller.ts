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
import { CreateAddress } from './dtos/create.dto';
import { AddressQueryDto } from './dtos/query.dto';
import { UpdateAddress } from './dtos/update.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AddressEntity } from './entity/address.entity';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { GetUserType } from 'src/common/types';
import { checkRowLevelPermission } from 'src/common/auth/util';

@ApiTags('addresses')
@Controller('addresses')
export class AddressesController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: AddressEntity })
  @Post()
  async create(
    @Body() createAddressDto: CreateAddress,
    @GetUser() user: GetUserType,
  ) {
    const garage = await this.prisma.property.findUnique({
      where: { id: createAddressDto.propertyId },
      include: { Brokerage: { include: { BrokerageManagers: true } } },
    });
    checkRowLevelPermission(
      user,
      garage.Brokerage.BrokerageManagers.map((manager) => manager.uid),
    );
    return this.prisma.address.create({ data: createAddressDto });
  }

  @ApiOkResponse({ type: [AddressEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: AddressQueryDto) {
    return this.prisma.address.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    });
  }

  @ApiOkResponse({ type: AddressEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.address.findUnique({ where: { id } });
  }

  @ApiOkResponse({ type: AddressEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAddressDto: UpdateAddress,
    @GetUser() user: GetUserType,
  ) {
    const address = await this.prisma.address.findUnique({
      where: { id },
      include: {
        Property: {
          include: { Brokerage: { include: { BrokerageManagers: true } } },
        },
      },
    });
    checkRowLevelPermission(
      user,
      address.Property.Brokerage.BrokerageManagers.map(
        (manager) => manager.uid,
      ),
    );
    return this.prisma.address.update({
      where: { id },
      data: updateAddressDto,
    });
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() user: GetUserType) {
    const address = await this.prisma.address.findUnique({
      where: { id },
      include: {
        Property: {
          include: { Brokerage: { include: { BrokerageManagers: true } } },
        },
      },
    });
    checkRowLevelPermission(
      user,
      address.Property.Brokerage.BrokerageManagers.map(
        (manager) => manager.uid,
      ),
    );
    return this.prisma.address.delete({ where: { id } });
  }
}
