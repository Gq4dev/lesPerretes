import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateReservationInput {
  @Field(() => String)
  @IsNotEmpty()
  startDate: string;

  @Field(() => String)
  @IsNotEmpty()
  endDate: string;

  @Field(() => String)
  @IsNotEmpty()
  serviceType: string;

  @Field(() => String)
  @IsNotEmpty()
  dogId: string;

}
