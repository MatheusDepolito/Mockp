import { Review } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class ReviewEntity implements RestrictProperties<ReviewEntity, Review> {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  rating: number;
  @IsOptional()
  comment: string;
  customerId: string;
  garageId: number;
}
