import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Dog } from 'src/dogs/entities/dog.entity';
import { List } from 'src/lists/entities/list.entity';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('listDogs')
@Unique('listDog-dog', ['list', 'dog'])
@ObjectType()
export class ListDog {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @Column({ type: 'numeric' })
  @Field(() => Int)
  quantity: number

  @Column()
  @Field(() => Boolean)
  paid: boolean


  @ManyToOne(() => List, (list) => list.listDog, { lazy: true })
  @Field(() => List)
  list: List

  @ManyToOne(() => Dog, (dog) => dog.listDog, { lazy: true })
  @Field(() => Dog)
  dog: Dog
}
