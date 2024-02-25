import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

@InputType()
export class CreateListDogInput {


  @Field(() => Int, { nullable: true })
  @IsNumber()
  @Min(1)
  @IsOptional()
  quantity: number = 1

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  paid: boolean = false

  @Field(() => ID)
  @IsUUID()
  listId: string


  @Field(() => ID)
  @IsUUID()
  dogId: string
}
