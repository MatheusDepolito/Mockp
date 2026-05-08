import { PartialType } from '@nestjs/swagger';
import { CreateReview } from './create.dto';
import { Review } from 'src/common/prisma/client';

export class UpdateReview extends PartialType(CreateReview) {
  id: Review['id'];
}
