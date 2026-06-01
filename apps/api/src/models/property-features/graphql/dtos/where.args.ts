import { Field, InputType, PartialType } from '@nestjs/graphql';
import { $Enums, Prisma } from 'src/common/prisma/client';
import {
  DateTimeFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input';
import { PropertyRelationFilter } from 'src/models/properties/graphql/dtos/where.args';

@InputType()
export class EnumPropertyFeatureTypeFilter {
  @Field(() => $Enums.PropertyFeatureType, { nullable: true })
  equals?: $Enums.PropertyFeatureType;
  @Field(() => [$Enums.PropertyFeatureType], { nullable: true })
  in?: $Enums.PropertyFeatureType[];
  @Field(() => [$Enums.PropertyFeatureType], { nullable: true })
  notIn?: $Enums.PropertyFeatureType[];
  @Field(() => $Enums.PropertyFeatureType, { nullable: true })
  not?: $Enums.PropertyFeatureType;
}

@InputType()
export class PropertyFeatureWhereUniqueInput {
  id: number;
}

@InputType()
export class PropertyFeatureWhereInputStrict
  implements
    RestrictProperties<
      PropertyFeatureWhereInputStrict,
      Prisma.PropertyFeatureWhereInput
    >
{
  id: IntFilter;
  createdAt: DateTimeFilter;
  updatedAt: DateTimeFilter;
  displayName: StringFilter;
  quantity: IntFilter;
  type: EnumPropertyFeatureTypeFilter;
  propertyId: IntFilter;
  Property: PropertyRelationFilter;

  AND: PropertyFeatureWhereInput[];
  OR: PropertyFeatureWhereInput[];
  NOT: PropertyFeatureWhereInput[];
}

@InputType()
export class PropertyFeatureWhereInput extends PartialType(
  PropertyFeatureWhereInputStrict,
) {}

@InputType()
export class PropertyFeatureListRelationFilter {
  every?: PropertyFeatureWhereInput;
  some?: PropertyFeatureWhereInput;
  none?: PropertyFeatureWhereInput;
}

@InputType()
export class PropertyFeatureRelationFilter {
  is?: PropertyFeatureWhereInput;
  isNot?: PropertyFeatureWhereInput;
}
