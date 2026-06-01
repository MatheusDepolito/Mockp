import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from 'src/common/prisma/client';
import {
  DateTimeFilter,
  FloatFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input';
import { PropertyRelationFilter } from 'src/models/properties/graphql/dtos/where.args';

@InputType()
export class AddressWhereUniqueInput {
  id: number;
}

@InputType()
export class AddressWhereInputStrict
  implements
    RestrictProperties<AddressWhereInputStrict, Prisma.AddressWhereInput>
{
  id: IntFilter;
  createdAt: DateTimeFilter;
  updatedAt: DateTimeFilter;
  address: StringFilter;
  lat: FloatFilter;
  lng: FloatFilter;
  propertyId: IntFilter;
  Property: PropertyRelationFilter;

  AND: AddressWhereInput[];
  OR: AddressWhereInput[];
  NOT: AddressWhereInput[];
}

@InputType()
export class AddressWhereInput extends PartialType(AddressWhereInputStrict) {}

@InputType()
export class AddressListRelationFilter {
  every?: AddressWhereInput;
  some?: AddressWhereInput;
  none?: AddressWhereInput;
}

@InputType()
export class AddressRelationFilter {
  is?: AddressWhereInput;
  isNot?: AddressWhereInput;
}
