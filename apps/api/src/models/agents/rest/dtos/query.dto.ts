import { IsIn, IsOptional } from 'class-validator';
import { Prisma } from 'src/common/prisma/client';
import { BaseQueryDto } from 'src/common/dtos/common.dto';

export class AgentQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsIn(Object.values(Prisma.AgentScalarFieldEnum))
  sortBy?: string;

  @IsOptional()
  @IsIn(Object.values(Prisma.AgentScalarFieldEnum))
  searchBy?: string;
}
