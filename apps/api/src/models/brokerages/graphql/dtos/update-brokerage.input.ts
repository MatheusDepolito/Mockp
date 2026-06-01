import { CreateBrokerageInput } from './create-brokerage.input';
import { InputType, PartialType } from '@nestjs/graphql';
import { Brokerage } from 'src/common/prisma/client';

@InputType()
export class UpdateBrokerageInput extends PartialType(CreateBrokerageInput) {
  id: Brokerage['id'];
}
