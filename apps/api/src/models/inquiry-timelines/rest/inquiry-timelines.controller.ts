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
import { CreateInquiryTimeline } from './dtos/create.dto';
import { InquiryTimelineQueryDto } from './dtos/query.dto';
import { UpdateInquiryTimeline } from './dtos/update.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { GetUserType } from 'src/common/types';
import { checkRowLevelPermission } from 'src/common/auth/util';
import { InquiryTimelineEntity } from './entity/inquiry-timeline.entity';

@ApiTags('inquiry-timelines')
@Controller('inquiry-timelines')
export class InquiryTimelinesController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: InquiryTimelineEntity })
  @Post()
  create(
    @Body() createInquiryTimelineDto: CreateInquiryTimeline,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, createInquiryTimelineDto.managerId);
    return this.prisma.inquiryTimeline.create({
      data: createInquiryTimelineDto,
    });
  }

  @ApiOkResponse({ type: [InquiryTimelineEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: InquiryTimelineQueryDto) {
    return this.prisma.inquiryTimeline.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    });
  }

  @ApiOkResponse({ type: InquiryTimelineEntity })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.prisma.inquiryTimeline.findUnique({ where: { id } });
  }

  @ApiOkResponse({ type: InquiryTimelineEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateInquiryTimelineDto: UpdateInquiryTimeline,
    @GetUser() user: GetUserType,
  ) {
    const inquiryTimeline = await this.prisma.inquiryTimeline.findUnique({
      where: { id },
    });
    checkRowLevelPermission(user, inquiryTimeline.managerId);
    return this.prisma.inquiryTimeline.update({
      where: { id },
      data: updateInquiryTimelineDto,
    });
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser() user: GetUserType) {
    const inquiryTimeline = await this.prisma.inquiryTimeline.findUnique({
      where: { id },
    });
    checkRowLevelPermission(user, inquiryTimeline.managerId);
    return this.prisma.inquiryTimeline.delete({ where: { id } });
  }
}
