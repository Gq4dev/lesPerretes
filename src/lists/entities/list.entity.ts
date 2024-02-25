import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { ListDog } from 'src/list-dog/entities/list-dog.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'lists' })
@ObjectType()
export class List {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @Column()
  @Field(() => String)
  name: string


  @ManyToOne(() => User, (user) => user.lists, { nullable: false, lazy: true })
  @Index('userId-list-index')
  @Field(() => User)
  user: User

  @OneToMany(() => ListDog, (listDog) => listDog.list, { lazy: true })
  @Field(() => [ListDog])
  listDog: ListDog

}
