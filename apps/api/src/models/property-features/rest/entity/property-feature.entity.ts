import { $Enums, PropertyFeature } from 'src/common/prisma/client';
import { IsOptional } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class PropertyFeatureEntity
  implements RestrictProperties<PropertyFeatureEntity, PropertyFeature>
{
  createdAt: Date;
  updatedAt: Date;
  id: number;
  propertyId: number;
  @IsOptional()
  displayName: string;
  type: $Enums.PropertyFeatureType;
  quantity: number;
}
