import { Field, ObjectType } from '@nestjs/graphql';
import { BrokerageManager as BrokerageManagerType } from 'src/common/prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@ObjectType()
export class BrokerageManager
  implements RestrictProperties<BrokerageManager, BrokerageManagerType>
{
  uid: string;
  createdAt: Date;
  updatedAt: Date;
  @Field({ nullable: true })
  displayName: string;
  brokerageId: number;
}
