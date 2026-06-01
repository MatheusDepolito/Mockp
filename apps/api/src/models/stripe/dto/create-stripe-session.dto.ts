import { CreateInquiryInput } from 'src/models/inquiries/graphql/dtos/create-inquiry.input';
import { TotalPrice } from '@mockp/util/types';

export class CreateStripeDto {
  uid: string;
  totalPriceObj: TotalPrice;
  inquiryData: CreateInquiryInput;
}
