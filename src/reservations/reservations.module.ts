import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsResolver } from './reservations.resolver';
import { User } from 'src/users/entities/user.entity';
import { DogsModule } from 'src/dogs/dogs.module';
import { ListsModule } from 'src/lists/lists.module';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';

@Module({
  providers: [ReservationsResolver, ReservationsService],
  imports: [TypeOrmModule.forFeature([Reservation])],
  exports: [
    TypeOrmModule,
    ReservationsService
  ]
})
export class ReservationsModule { }
