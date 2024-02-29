import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ListDog } from 'src/list-dog/entities/list-dog.entity';
import { Owner } from 'src/owner/entities/owner.entity';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'dogs' })
@ObjectType()
export class Dog {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @Column()
  @Field(() => String)
  name: string

  @Column()
  @Field(() => String)
  breed: string

  @Column()
  @Field(() => Boolean)
  neutered: boolean

  
  @ManyToOne(() => Owner, (owner) => owner.dogs)
  @Field(() => Owner)
  owner: Owner;

  @OneToMany(() => Reservation, reservation => reservation.dog)
  reservations: Reservation[];


  @OneToMany(() => ListDog, (listDog) => listDog.dog, { lazy: true })
  // @Field(() => [ListDog])
  listDog: ListDog[]

  @ManyToOne(() => User, (user) => user.dogs)
  @Index('userId-index')
  @Field(() => User)
  user: User
}
