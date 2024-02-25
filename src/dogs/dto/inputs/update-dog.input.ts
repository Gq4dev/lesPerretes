import { IsUUID } from 'class-validator';
import { CreateDogInput } from './create-dog.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateDogInput extends PartialType(CreateDogInput) {
  @Field(() => ID)
  @IsUUID()
  id: string
}
