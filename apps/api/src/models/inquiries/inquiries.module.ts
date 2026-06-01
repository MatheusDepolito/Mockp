import { Module } from '@nestjs/common';
import { InquiriesService } from './graphql/inquiries.service';
import { InquiriesResolver } from './graphql/inquiries.resolver';
import { InquiriesController } from './rest/inquiries.controller';

@Module({
  providers: [InquiriesResolver, InquiriesService],
  exports: [InquiriesService],
  controllers: [InquiriesController],
})
export class InquiriesModule {}
