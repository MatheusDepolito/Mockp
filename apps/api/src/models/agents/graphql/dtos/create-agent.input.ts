import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAgentInput {
  @Field()
  email: string;

  @Field()
  displayName: string;

  @Field()
  licenseID: string;

  @Field({ nullable: true })
  image?: string;
}
