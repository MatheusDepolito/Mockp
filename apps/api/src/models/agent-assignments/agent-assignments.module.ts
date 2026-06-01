import { Module } from '@nestjs/common';
import { AgentAssignmentsService } from './graphql/agent-assignments.service';
import { AgentAssignmentsResolver } from './graphql/agent-assignments.resolver';
import { AgentAssignmentsController } from './rest/agent-assignments.controller';

@Module({
  providers: [AgentAssignmentsResolver, AgentAssignmentsService],
  exports: [AgentAssignmentsService],
  controllers: [AgentAssignmentsController],
})
export class AgentAssignmentsModule {}
