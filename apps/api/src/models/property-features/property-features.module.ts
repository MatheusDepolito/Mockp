import { Module } from '@nestjs/common';
import { PropertyFeaturesService } from './graphql/property-features.service';
import { PropertyFeaturesResolver } from './graphql/property-features.resolver';
import { PropertyFeaturesController } from './rest/property-features.controller';

@Module({
  providers: [PropertyFeaturesResolver, PropertyFeaturesService],
  exports: [PropertyFeaturesService],
  controllers: [PropertyFeaturesController],
})
export class PropertyFeaturesModule {}
