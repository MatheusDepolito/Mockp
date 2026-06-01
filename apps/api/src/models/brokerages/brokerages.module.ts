import { Module } from '@nestjs/common';
import { BrokeragesService } from './graphql/brokerages.service';
import { BrokeragesResolver } from './graphql/brokerages.resolver';
import { BrokeragesController } from './rest/brokerages.controller';

@Module({
  providers: [BrokeragesResolver, BrokeragesService],
  exports: [BrokeragesService],
  controllers: [BrokeragesController],
})
export class BrokeragesModule {}
