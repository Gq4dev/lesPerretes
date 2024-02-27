import { Injectable } from '@nestjs/common';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';

@Injectable()
export class ReservationsService {

  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>
  ) { }


  async create(createReservationInput: CreateReservationInput): Promise<Reservation> {
    const reservation = this.reservationRepository.create({ ...createReservationInput });
    return await this.reservationRepository.save(reservation);
  }
  async findAll(): Promise<Reservation[]> {
    return await this.reservationRepository.find()
  }

  findOne(id: string) {
    return `This action returns a #${id} reservation`;
  }

  update(id: string, updateReservationInput: UpdateReservationInput) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }

  async getReservationsByDogId(id: string): Promise<Reservation[]> {
    return this.reservationRepository.find({ where: { id } });
  }

  async getReservationsByDate(startDate: string, endDate: string): Promise<Reservation[]> {

    return this.reservationRepository.find({
      where: {
        startDate: Between(startDate, endDate),
      },
      relations: ['dog']
    })
  }
}
