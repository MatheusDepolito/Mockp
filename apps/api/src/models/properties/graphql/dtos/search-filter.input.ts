import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { FindManyPropertyArgs } from './find.args';
import { PropertyFeature } from 'src/models/property-features/graphql/entity/property-feature.entity';

@InputType()
export class DateFilterInput {
  start: string;
  end: string;
}

@InputType()
export class PropertyFilter extends PickType(
  FindManyPropertyArgs,
  ['where', 'orderBy', 'skip', 'take'],
  InputType,
) {}

@ObjectType()
export class MinimalPropertyFeatureGroupBy extends PickType(PropertyFeature, [
  'type',
  'quantity',
]) {
  count: number;
}
