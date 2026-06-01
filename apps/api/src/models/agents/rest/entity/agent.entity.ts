import { Agent } from 'src/common/prisma/client';
import { IsDate, IsString, IsInt, IsOptional } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class AgentEntity implements RestrictProperties<AgentEntity, Agent> {
  @IsOptional()
  image: string;
  @IsOptional()
  brokerageId: number;
  uid: string;
  createdAt: Date;
  updatedAt: Date;
  displayName: string;
  licenseID: string;
}
