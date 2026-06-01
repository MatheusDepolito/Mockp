import { AgentAssignment } from 'src/common/prisma/client';
import { IsOptional } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class AgentAssignmentEntity
  implements RestrictProperties<AgentAssignmentEntity, AgentAssignment>
{
  inquiryId: number;
  createdAt: Date;
  updatedAt: Date;
  @IsOptional()
  visitLat: number;
  @IsOptional()
  visitLng: number;
  @IsOptional()
  assignedAgentId: string;
}
