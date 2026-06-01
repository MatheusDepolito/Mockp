import { $Enums, Property } from 'src/common/prisma/client';
import { IsOptional } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class PropertyEntity
  implements RestrictProperties<PropertyEntity, Property>
{
  id: number;
  createdAt: Date;
  updatedAt: Date;
  @IsOptional()
  displayName: string;
  @IsOptional()
  description: string;
  images: string[];
  propertyType: $Enums.PropertyType;
  purpose: $Enums.PropertyPurpose;
  @IsOptional()
  listPrice: number;
  @IsOptional()
  brokerageId: number;
  responsibleAgentId: string;
}
