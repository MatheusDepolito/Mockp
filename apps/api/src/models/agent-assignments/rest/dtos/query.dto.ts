import { IsIn, IsOptional } from 'class-validator';
import { Prisma } from 'src/common/prisma/client';
import { BaseQueryDto } from 'src/common/dtos/common.dto';

export class AgentAssignmentQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsIn(Object.values(Prisma.AgentAssignmentScalarFieldEnum))
  sortBy?: string;

  @IsOptional()
  @IsIn(Object.values(Prisma.AgentAssignmentScalarFieldEnum))
  searchBy?: string;
}
