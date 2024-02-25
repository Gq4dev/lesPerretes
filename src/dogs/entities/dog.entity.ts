import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ListDog } from 'src/list-dog/entities/list-dog.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.dogs, { nullable: false, lazy: true })
  @Index('userId-index')
  @Field(() => User)
  user: User


  @OneToMany(() => ListDog, (listDog) => listDog.dog, { lazy: true })
  // @Field(() => [ListDog])
  listDog: ListDog[]


}
