import { Field, ObjectType } from '@nestjs/graphql';
import { Address as AddressType } from 'src/common/prisma/client';
import { RestrictProperties } from 'src/common/dtos/common.input';

@ObjectType()
export class Address implements RestrictProperties<Address, AddressType> {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  address: string;
  lat: number;
  lng: number;
  @Field({ nullable: true })
  garageId: number;
}
