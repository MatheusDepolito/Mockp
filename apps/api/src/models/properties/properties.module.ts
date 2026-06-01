import { Module } from '@nestjs/common';
import { PropertiesService } from './graphql/properties.service';
import { PropertiesResolver } from './graphql/properties.resolver';
import { PropertiesController } from './rest/properties.controller';

@Module({
  providers: [PropertiesResolver, PropertiesService],
  exports: [PropertiesService],
  controllers: [PropertiesController],
})
export class PropertiesModule {}
