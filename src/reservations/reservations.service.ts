import { Injectable } from '@nestjs/common';
import { CreateReservationInput } from './dto/create-reservation.input';
import { UpdateReservationInput } from './dto/update-reservation.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { PaginationArgs, SearchArgs } from 'src/common/dto/args';

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

  async getReservationsByDate(paginationArgs: PaginationArgs, searchArgs: SearchArgs): Promise<Reservation[]> {

    const { limit, offset } = paginationArgs
    const { search, startDate, endDate } = searchArgs

    const queryBuilder = this.reservationRepository.createQueryBuilder('reservation')
      .take(limit)
      .skip(offset)
      .where('reservation.startDate BETWEEN :startDate AND :endDate', { startDate, endDate })
      .leftJoinAndSelect('reservation.dog', 'dog')

    return queryBuilder.getMany()

  }
}
