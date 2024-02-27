import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateReservationInput {
  @Field(() => Date)
  @IsNotEmpty()
  startDate: string;

  @Field(() => Date)
  @IsNotEmpty()
  endDate: string;

  @Field(() => String)
  @IsNotEmpty()
  serviceType: string;
}
