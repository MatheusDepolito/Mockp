import { Module } from '@nestjs/common';
import { AgentsService } from './graphql/agents.service';
import { AgentsResolver } from './graphql/agents.resolver';
import { AgentsController } from './rest/agents.controller';

@Module({
  providers: [AgentsResolver, AgentsService],
  exports: [AgentsService],
  controllers: [AgentsController],
})
export class AgentsModule {}
