import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReservationsService } from './reservations.service';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Currentuser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { PaginationArgs, SearchArgs } from 'src/common/dto/args';

@Resolver(() => Reservation)
@UseGuards(JwtAuthGuard)

export class ReservationsResolver {
  constructor(
    private readonly reservationsService: ReservationsService) { }

  @Mutation(() => Reservation, { name: 'createReservation' })
  createReservation(
    @Args('createReservationInput') createReservationInput: CreateReservationInput,
    @Currentuser() user: User
  ): Promise<Reservation> {

    return this.reservationsService.create(createReservationInput);
  }

  @Query(() => [Reservation], { name: 'reservations' })
  findAll() {
    return this.reservationsService.findAll();
  }

  @Query(() => [Reservation])
  async getReservationsByDate(
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs
  ): Promise<Reservation[]> {


    return this.reservationsService.getReservationsByDate(paginationArgs, searchArgs);
  }

  @Query(() => Reservation, { name: 'reservation' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.reservationsService.findOne(id);
  }

  @Mutation(() => Reservation)
  updateReservation(
    @Args('updateReservationInput') updateReservationInput: UpdateReservationInput) {
    return this.reservationsService.update(updateReservationInput.id, updateReservationInput);
  }

  @Mutation(() => Reservation)
  removeReservation(@Args('id', { type: () => Int }) id: number) {
    return this.reservationsService.remove(id);
  }
}
