import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateDogInput {

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  name: string

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  breed: string

  @Field(() => Boolean)
  @IsNotEmpty()
  neutered: boolean

  @Field(() => String)
  ownerId: string;
}
