import { $Enums, Slot } from '@prisma/client';
import { IsDate, IsString, IsInt, IsObject, IsOptional } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class SlotEntity implements RestrictProperties<SlotEntity, Slot> {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  garageId: number;
  @IsOptional()
  displayName: string;
  @IsOptional()
  length: number;
  type: $Enums.SlotType;
  pricePerHour: number;
  @IsOptional()
  width: number;
  @IsOptional()
  height: number;
}
