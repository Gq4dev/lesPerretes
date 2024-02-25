import { IsUUID } from 'class-validator';
import { CreateListDogInput } from './create-list-dog.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateListDogInput extends PartialType(CreateListDogInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
