// src/entities/reservation.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Dog } from 'src/dogs/entities/dog.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity({ name: 'reservations' })
@ObjectType()
export class Reservation {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'date' })
  @Field(() => String)
  startDate: string

  @Column({ type: 'date' })
  @Field(() => String)
  endDate: string

  @Column()
  @Field(() => String)
  serviceType: string

  @Column({ type: 'uuid' })
  @Field(() => ID)
  dogId: string;

  @ManyToOne(() => Dog, (dog) => dog.reservations)
  @Field(() => Dog)
  dog: Dog;
}
