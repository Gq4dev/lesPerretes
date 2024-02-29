import { IsUUID } from 'class-validator';
import { CreateOwnerInput } from './create-owner.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateOwnerInput extends PartialType(CreateOwnerInput) {
  @Field(() => ID)
  @IsUUID()
  id: string
}
