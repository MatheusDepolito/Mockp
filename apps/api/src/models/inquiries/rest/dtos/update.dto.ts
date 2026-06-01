import { PartialType } from '@nestjs/swagger';
import { CreateInquiry } from './create.dto';
import { Inquiry } from 'src/common/prisma/client';

export class UpdateInquiry extends PartialType(CreateInquiry) {
  id: Inquiry['id'];
}
