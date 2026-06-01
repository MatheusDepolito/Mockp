import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { $Enums, Inquiry as InquiryType } from 'src/common/prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

registerEnumType($Enums.InquiryStatus, {
  name: 'InquiryStatus',
});

@ObjectType()
export class Inquiry implements RestrictProperties<Inquiry, InquiryType> {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  @Field({ nullable: true })
  listPriceAtInquiry: number;
  @Field({ nullable: true })
  totalPrice: number;
  startTime: Date;
  endTime: Date;
  contactNotes: string;
  @Field({ nullable: true })
  phoneNumber: string;
  @Field({ nullable: true })
  passcode: string;
  @Field(() => $Enums.InquiryStatus)
  status: $Enums.InquiryStatus;
  propertyId: number;
  customerId: string;
  // Todo Add below to make optional fields optional.
  // @Field({ nullable: true })
}
