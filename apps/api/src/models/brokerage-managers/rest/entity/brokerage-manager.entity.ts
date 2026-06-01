import { BrokerageManager } from 'src/common/prisma/client';
import { IsDate, IsString, IsInt, IsOptional } from 'class-validator';
import { RestrictProperties } from 'src/common/dtos/common.input';

export class BrokerageManagerEntity
  implements RestrictProperties<BrokerageManagerEntity, BrokerageManager>
{
  uid: string;
  createdAt: Date;
  updatedAt: Date;
  @IsOptional()
  displayName: string;
  @IsOptional()
  brokerageId: number;
}
