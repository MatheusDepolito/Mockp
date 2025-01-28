import { RegisterWithProviderInput } from './create-user.input';
import { InputType, PartialType } from '@nestjs/graphql';
import { User } from '@prisma/client';

@InputType()
export class UpdateUserInput extends PartialType(RegisterWithProviderInput) {
  uid: User['uid'];
}
