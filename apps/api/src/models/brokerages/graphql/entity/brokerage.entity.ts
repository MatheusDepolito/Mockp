import { Field, ObjectType } from '@nestjs/graphql';
import { Brokerage as BrokerageType } from 'src/common/prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@ObjectType()
export class Brokerage implements RestrictProperties<Brokerage, BrokerageType> {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  @Field({ nullable: true })
  displayName: string;
  @Field({ nullable: true })
  description: string;
  verified: boolean;
}
