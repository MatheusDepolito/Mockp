import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { InquiriesService } from '../inquiries/graphql/inquiries.service';
import StripeService from './stripe.service';
import { CreateStripeDto } from './dto/create-stripe-session.dto';
import { CreateInquiryInput } from '../inquiries/graphql/dtos/create-inquiry.input';
import { Response } from 'express';
@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly inquiriesService: InquiriesService,
  ) {}

  @Get()
  helloStripe() {
    return 'Hello stripe';
  }

  @Post()
  create(@Body() createStripeDto: CreateStripeDto) {
    return this.stripeService.createStripeSession(createStripeDto);
  }

  @Get('success')
  async handleStripeSuccess(
    @Query('session_id') sessionId: string,
    @Res() res: Response,
  ) {
    if (!sessionId) {
      throw new BadRequestException('Session id missing.');
    }

    const session =
      await this.stripeService.stripe.checkout.sessions.retrieve(sessionId);

    const { uid, inquiryData } = session.metadata;

    const inquiryInput: CreateInquiryInput = JSON.parse(inquiryData);
    const newInquiry = await this.inquiriesService.create(inquiryInput);
    res.redirect(process.env.BOOKINGS_REDIRECT_URL);
  }
}
