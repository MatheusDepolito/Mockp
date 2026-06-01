import { $Enums, InquiryTimeline } from 'src/common/prisma/client';
import { IsDate, IsString, IsInt, IsOptional } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class InquiryTimelineEntity
  implements RestrictProperties<InquiryTimelineEntity, InquiryTimeline>
{
  id: number;
  timestamp: Date;
  status: $Enums.InquiryStatus;
  inquiryId: number;
  @IsOptional()
  agentId: string;
  @IsOptional()
  managerId: string;
}
