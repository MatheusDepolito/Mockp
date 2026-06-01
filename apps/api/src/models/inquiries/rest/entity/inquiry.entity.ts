import { $Enums, Inquiry } from 'src/common/prisma/client';
import { IsDate, IsString, IsInt, IsOptional } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class InquiryEntity
  implements RestrictProperties<InquiryEntity, Inquiry>
{
  id: number;
  createdAt: Date;
  updatedAt: Date;
  @IsOptional()
  listPriceAtInquiry: number;
  @IsOptional()
  totalPrice: number;
  startTime: Date;
  endTime: Date;
  contactNotes: string;
  @IsOptional()
  phoneNumber: string;
  @IsOptional()
  passcode: string;
  status: $Enums.InquiryStatus;
  propertyId: number;
  customerId: string;
}
