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
import { CreateAgent } from './dtos/create.dto';
import { AgentQueryDto } from './dtos/query.dto';
import { UpdateAgent } from './dtos/update.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AgentEntity } from './entity/agent.entity';
import { AllowAuthenticated, GetUser } from 'src/common/auth/auth.decorator';
import { GetUserType } from 'src/common/types';
import { checkRowLevelPermission } from 'src/common/auth/util';

@ApiTags('agents')
@Controller('agents')
export class AgentsController {
  constructor(private readonly prisma: PrismaService) {}

  @AllowAuthenticated()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: AgentEntity })
  @Post()
  create(@Body() createAgentDto: CreateAgent, @GetUser() user: GetUserType) {
    checkRowLevelPermission(user, createAgentDto.uid);
    return this.prisma.agent.create({ data: createAgentDto });
  }

  @ApiOkResponse({ type: [AgentEntity] })
  @Get()
  findAll(@Query() { skip, take, order, sortBy }: AgentQueryDto) {
    return this.prisma.agent.findMany({
      ...(skip ? { skip: +skip } : null),
      ...(take ? { take: +take } : null),
      ...(sortBy ? { orderBy: { [sortBy]: order || 'asc' } } : null),
    });
  }

  @ApiOkResponse({ type: AgentEntity })
  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    return this.prisma.agent.findUnique({ where: { uid } });
  }

  @ApiOkResponse({ type: AgentEntity })
  @ApiBearerAuth()
  @AllowAuthenticated()
  @Patch(':uid')
  async update(
    @Param('uid') uid: string,
    @Body() updateAgentDto: UpdateAgent,
    @GetUser() user: GetUserType,
  ) {
    const agent = await this.prisma.agent.findUnique({ where: { uid } });
    checkRowLevelPermission(user, agent.uid);
    return this.prisma.agent.update({
      where: { uid },
      data: updateAgentDto,
    });
  }

  @ApiBearerAuth()
  @AllowAuthenticated()
  @Delete(':uid')
  async remove(@Param('uid') uid: string, @GetUser() user: GetUserType) {
    const agent = await this.prisma.agent.findUnique({ where: { uid } });
    checkRowLevelPermission(user, agent.uid);
    return this.prisma.agent.delete({ where: { uid } });
  }
}
