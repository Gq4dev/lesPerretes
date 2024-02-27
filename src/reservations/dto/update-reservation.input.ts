import { IsUUID } from 'class-validator';
import { CreateReservationInput } from './create-reservation.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateReservationInput extends PartialType(CreateReservationInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
