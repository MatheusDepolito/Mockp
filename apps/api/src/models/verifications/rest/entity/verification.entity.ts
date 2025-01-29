import { Verification } from '@prisma/client';
import { IsDate, IsString, IsInt } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class VerificationEntity
  implements RestrictProperties<VerificationEntity, Verification>
{
  createdAt: Date;
  updatedAt: Date;
  adminId: string;
  garageId: number;
  verified: boolean;
}
