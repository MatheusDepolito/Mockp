import { PartialType } from '@nestjs/swagger';
import { CreateAgentAssignment } from './create.dto';
import { AgentAssignment } from 'src/common/prisma/client';

export class UpdateAgentAssignment extends PartialType(CreateAgentAssignment) {
  inquiryId: AgentAssignment['inquiryId'];
}
