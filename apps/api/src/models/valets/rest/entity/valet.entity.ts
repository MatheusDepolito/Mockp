import { Valet } from '@prisma/client';
import { IsDate, IsString, IsInt, IsOptional } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class ValetEntity implements RestrictProperties<ValetEntity, Valet> {
  @IsOptional()
  image: string;
  @IsOptional()
  companyId: number;
  uid: string;
  createdAt: Date;
  updatedAt: Date;
  displayName: string;
  licenseID: string;
}
