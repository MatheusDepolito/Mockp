import { IsIn, IsOptional } from 'class-validator';
import { Prisma } from 'src/common/prisma/client';
import { BaseQueryDto } from 'src/common/dtos/common.dto';

export class ValetQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsIn(Object.values(Prisma.ValetScalarFieldEnum))
  sortBy?: string;

  @IsOptional()
  @IsIn(Object.values(Prisma.ValetScalarFieldEnum))
  searchBy?: string;
}
