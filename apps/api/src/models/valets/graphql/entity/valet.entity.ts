import { Field, ObjectType } from '@nestjs/graphql';
import { Valet as ValetType } from '@prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@ObjectType()
export class Valet implements RestrictProperties<Valet, ValetType> {
  uid: string;
  createdAt: Date;
  updatedAt: Date;
  @Field({ nullable: true })
  image: string;
  displayName: string;
  @Field({ nullable: true })
  companyId: number;
  licenseID: string;
  // Todo Add below to make optional fields optional.
  // @Field({ nullable: true })
}
