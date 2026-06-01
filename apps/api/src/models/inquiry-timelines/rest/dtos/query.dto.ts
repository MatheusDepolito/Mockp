import { IsIn, IsOptional } from 'class-validator';
import { Prisma } from 'src/common/prisma/client';
import { BaseQueryDto } from 'src/common/dtos/common.dto';

export class InquiryTimelineQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsIn(Object.values(Prisma.InquiryTimelineScalarFieldEnum))
  sortBy?: string;

  @IsOptional()
  @IsIn(Object.values(Prisma.InquiryTimelineScalarFieldEnum))
  searchBy?: string;
}
