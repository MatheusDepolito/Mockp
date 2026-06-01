import { Module } from '@nestjs/common';

import { StripeController } from './stripe.controller';
import StripeService from './stripe.service';
import { InquiriesService } from '../inquiries/graphql/inquiries.service';

@Module({
  controllers: [StripeController],
  providers: [StripeService, InquiriesService],
})
export class StripeModule {}
