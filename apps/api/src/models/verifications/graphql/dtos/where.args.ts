import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from 'src/common/prisma/client';
import {
  BoolFilter,
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input';
import { AdminRelationFilter } from 'src/models/admins/graphql/dtos/where.args';
import { PropertyRelationFilter } from 'src/models/properties/graphql/dtos/where.args';

@InputType()
export class VerificationWhereUniqueInput {
  propertyId: number;
}

@InputType()
export class VerificationWhereInputStrict
  implements
    RestrictProperties<
      VerificationWhereInputStrict,
      Prisma.VerificationWhereInput
    >
{
  createdAt: DateTimeFilter;
  updatedAt: DateTimeFilter;
  verified: BoolFilter;
  adminId: StringFilter;
  propertyId: IntFilter;
  Admin: AdminRelationFilter;
  Property: PropertyRelationFilter;

  AND: VerificationWhereInput[];
  OR: VerificationWhereInput[];
  NOT: VerificationWhereInput[];
}

@InputType()
export class VerificationWhereInput extends PartialType(
  VerificationWhereInputStrict,
) {}

@InputType()
export class VerificationListRelationFilter {
  every?: VerificationWhereInput;
  some?: VerificationWhereInput;
  none?: VerificationWhereInput;
}

@InputType()
export class VerificationRelationFilter {
  is?: VerificationWhereInput;
  isNot?: VerificationWhereInput;
}
