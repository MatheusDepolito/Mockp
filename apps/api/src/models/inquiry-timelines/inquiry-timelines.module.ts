import { Module } from '@nestjs/common';
import { InquiryTimelinesService } from './graphql/inquiry-timelines.service';
import { InquiryTimelinesResolver } from './graphql/inquiry-timelines.resolver';
import { InquiryTimelinesController } from './rest/inquiry-timelines.controller';

@Module({
  providers: [InquiryTimelinesResolver, InquiryTimelinesService],
  exports: [InquiryTimelinesService],
  controllers: [InquiryTimelinesController],
})
export class InquiryTimelinesModule {}
