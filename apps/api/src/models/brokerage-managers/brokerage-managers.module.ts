import { Module } from '@nestjs/common';
import { BrokerageManagersService } from './graphql/brokerage-managers.service';
import { BrokerageManagersResolver } from './graphql/brokerage-managers.resolver';
import { BrokerageManagersController } from './rest/brokerage-managers.controller';

@Module({
  providers: [BrokerageManagersResolver, BrokerageManagersService],
  exports: [BrokerageManagersService],
  controllers: [BrokerageManagersController],
})
export class BrokerageManagersModule {}
