import { CreateInquiryInput } from './create-inquiry.input';
import { InputType, PartialType } from '@nestjs/graphql';
import { Inquiry } from 'src/common/prisma/client';

@InputType()
export class UpdateInquiryInput extends PartialType(CreateInquiryInput) {
  id: Inquiry['id'];
}
