import { OmitType } from '@nestjs/swagger';
import { InquiryEntity } from '../entity/inquiry.entity';

export class CreateInquiry extends OmitType(InquiryEntity, [
  'createdAt',
  'updatedAt',
  'id',
]) {}
