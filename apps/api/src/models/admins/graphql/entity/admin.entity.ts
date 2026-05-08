import { Field, ObjectType } from '@nestjs/graphql';
import { Admin as AdminType } from 'src/common/prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@ObjectType()
export class Admin implements RestrictProperties<Admin, AdminType> {
  createdAt: Date;
  updatedAt: Date;
  @Field()
  uid: string;
}
