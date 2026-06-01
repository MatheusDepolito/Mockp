import { Field, InputType, PartialType } from '@nestjs/graphql';
import { $Enums, Prisma } from 'src/common/prisma/client';
import {
  DateTimeFilter,
  FloatFilter,
  IntFilter,
  RestrictProperties,
  StringFilter,
  StringListFilter,
} from 'src/common/dtos/common.input';
import { AddressRelationFilter } from 'src/models/addresses/graphql/dtos/where.args';
import { BrokerageRelationFilter } from 'src/models/brokerages/graphql/dtos/where.args';
import { ReviewListRelationFilter } from 'src/models/reviews/graphql/dtos/where.args';
import { PropertyFeatureListRelationFilter } from 'src/models/property-features/graphql/dtos/where.args';
import { VerificationRelationFilter } from 'src/models/verifications/graphql/dtos/where.args';
import { AgentRelationFilter } from 'src/models/agents/graphql/dtos/where.args';
import { InquiryListRelationFilter } from 'src/models/inquiries/graphql/dtos/where.args';

@InputType()
export class EnumPropertyTypeFilter {
  @Field(() => $Enums.PropertyType, { nullable: true })
  equals?: $Enums.PropertyType;
  @Field(() => [$Enums.PropertyType], { nullable: true })
  in?: $Enums.PropertyType[];
  @Field(() => [$Enums.PropertyType], { nullable: true })
  notIn?: $Enums.PropertyType[];
  @Field(() => $Enums.PropertyType, { nullable: true })
  not?: $Enums.PropertyType;
}

@InputType()
export class EnumPropertyPurposeFilter {
  @Field(() => $Enums.PropertyPurpose, { nullable: true })
  equals?: $Enums.PropertyPurpose;
  @Field(() => [$Enums.PropertyPurpose], { nullable: true })
  in?: $Enums.PropertyPurpose[];
  @Field(() => [$Enums.PropertyPurpose], { nullable: true })
  notIn?: $Enums.PropertyPurpose[];
  @Field(() => $Enums.PropertyPurpose, { nullable: true })
  not?: $Enums.PropertyPurpose;
}

@InputType()
export class PropertyWhereUniqueInput {
  id: number;
}

@InputType()
export class PropertyWhereInputStrict
  implements
    RestrictProperties<PropertyWhereInputStrict, Prisma.PropertyWhereInput>
{
  id: IntFilter;
  createdAt: DateTimeFilter;
  updatedAt: DateTimeFilter;
  displayName: StringFilter;
  description: StringFilter;
  images: StringListFilter;
  propertyType: EnumPropertyTypeFilter;
  purpose: EnumPropertyPurposeFilter;
  listPrice: FloatFilter;
  brokerageId: IntFilter;
  responsibleAgentId: StringFilter;
  Brokerage: BrokerageRelationFilter;
  ResponsibleAgent: AgentRelationFilter;
  Address: AddressRelationFilter;
  Verification: VerificationRelationFilter;
  Reviews: ReviewListRelationFilter;
  PropertyFeatures: PropertyFeatureListRelationFilter;
  Inquiries: InquiryListRelationFilter;

  AND: PropertyWhereInput[];
  OR: PropertyWhereInput[];
  NOT: PropertyWhereInput[];
}

@InputType()
export class PropertyWhereInput extends PartialType(PropertyWhereInputStrict) {}

@InputType()
export class PropertyListRelationFilter {
  every?: PropertyWhereInput;
  some?: PropertyWhereInput;
  none?: PropertyWhereInput;
}

@InputType()
export class PropertyRelationFilter {
  is?: PropertyWhereInput;
  isNot?: PropertyWhereInput;
}
