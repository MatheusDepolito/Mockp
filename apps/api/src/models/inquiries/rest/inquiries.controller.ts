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
import { CreateInquiry } from './dtos/create.dto';
import { InquiryQueryDto } from './dtos/query.dto';
import { UpdateInquiry } from './dtos/update.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { InquiryEntity } from './entity/inquiry.entity';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { GetUserType } from 'src/common/types';
import { checkRowLevelPermission } from 'src/common/auth/util';

@ApiTags('bookings')
@Controller('bookings')
export class InquiriesController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: InquiryEntity })
  @Post()
  create(
    @Body() createInquiryDto: CreateInquiry,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, createInquiryDto.customerId);
    return this.prisma.inquiry.create({ data: createInquiryDto });
  }

  @ApiOkResponse({ type: [InquiryEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: InquiryQueryDto) {
    return this.prisma.inquiry.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    });
  }

  @ApiOkResponse({ type: InquiryEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.inquiry.findUnique({ where: { id } });
  }

  @ApiOkResponse({ type: InquiryEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateInquiryDto: UpdateInquiry,
    @GetUser() user: GetUserType,
  ) {
    const booking = await this.prisma.inquiry.findUnique({ where: { id } });
    checkRowLevelPermission(user, booking.customerId);
    return this.prisma.inquiry.update({
      where: { id },
      data: updateInquiryDto,
    });
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() user: GetUserType) {
    const booking = await this.prisma.inquiry.findUnique({ where: { id } });
    checkRowLevelPermission(user, booking.customerId);
    return this.prisma.inquiry.delete({ where: { id } });
  }
}
