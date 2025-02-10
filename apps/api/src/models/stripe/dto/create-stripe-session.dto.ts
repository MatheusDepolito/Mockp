import { CreateBookingInput } from 'src/models/bookings/graphql/dtos/create-booking.input';
import { TotalPrice } from '@mockp/util/types';

export class CreateStripeDto {
  uid: string;
  totalPriceObj: TotalPrice;
  bookingData: CreateBookingInput;
}
