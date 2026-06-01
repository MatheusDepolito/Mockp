import { IsIn, IsOptional } from 'class-validator';
import { Prisma } from 'src/common/prisma/client';
import { BaseQueryDto } from 'src/common/dtos/common.dto';

export class PropertyQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsIn(Object.values(Prisma.PropertyScalarFieldEnum))
  sortBy?: string;

  @IsOptional()
  @IsIn(Object.values(Prisma.PropertyScalarFieldEnum))
  searchBy?: string;
}
