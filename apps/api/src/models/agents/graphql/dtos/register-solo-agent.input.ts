import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterSoloAgentInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  displayName: string;

  @Field()
  licenseID: string;

  @Field({ nullable: true })
  image?: string;
}
