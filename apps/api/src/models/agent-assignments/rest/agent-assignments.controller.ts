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
import { CreateAgentAssignment } from './dtos/create.dto';
import { AgentAssignmentQueryDto } from './dtos/query.dto';
import { UpdateAgentAssignment } from './dtos/update.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AgentAssignmentEntity } from './entity/agent-assignment.entity';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { GetUserType } from 'src/common/types';
import { checkRowLevelPermission } from 'src/common/auth/util';

@ApiTags('agent-assignments')
@Controller('agent-assignments')
export class AgentAssignmentsController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: AgentAssignmentEntity })
  @Post()
  create(
    @Body() createAgentAssignmentDto: CreateAgentAssignment,
    @GetUser() user: GetUserType,
  ) {
    checkRowLevelPermission(user, createAgentAssignmentDto.assignedAgentId);
    return this.prisma.agentAssignment.create({
      data: createAgentAssignmentDto,
    });
  }

  @ApiOkResponse({ type: [AgentAssignmentEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: AgentAssignmentQueryDto) {
    return this.prisma.agentAssignment.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    });
  }

  @ApiOkResponse({ type: AgentAssignmentEntity })
  @Get(':inquiryId')
  findOne(@Param('inquiryId') inquiryId: number) {
    return this.prisma.agentAssignment.findUnique({ where: { inquiryId } });
  }

  @ApiOkResponse({ type: AgentAssignmentEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':inquiryId')
  async update(
    @Param('inquiryId') inquiryId: number,
    @Body() updateAgentAssignmentDto: UpdateAgentAssignment,
    @GetUser() user: GetUserType,
  ) {
    const agentAssignment = await this.prisma.agentAssignment.findUnique({
      where: { inquiryId },
    });
    checkRowLevelPermission(user, agentAssignment.assignedAgentId);
    return this.prisma.agentAssignment.update({
      where: { inquiryId },
      data: updateAgentAssignmentDto,
    });
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':inquiryId')
  async remove(
    @Param('inquiryId') inquiryId: number,
    @GetUser() user: GetUserType,
  ) {
    const agentAssignment = await this.prisma.agentAssignment.findUnique({
      where: { inquiryId },
    });
    checkRowLevelPermission(user, agentAssignment.assignedAgentId);
    return this.prisma.agentAssignment.delete({ where: { inquiryId } });
  }
}
