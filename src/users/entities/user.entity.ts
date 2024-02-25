import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Dog } from 'src/dogs/entities/dog.entity';
import { List } from 'src/lists/entities/list.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {

  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string

  @Column()
  @Field(() => String)
  fullName: string

  @Column({ unique: true })
  @Field(() => String)
  email: string

  @Column()
  //@Field(() => String) No se hace consulta sobre este campo
  password: string

  @Column({ type: 'text', array: true, default: ['user'] })
  @Field(() => [String])
  roles: string[]

  @Column({ type: 'boolean', default: true })
  @Field(() => Boolean)
  isActive: boolean

  @ManyToOne(() => User, (user) => user.lastUpdatedBy, { nullable: true, lazy: true })
  @JoinColumn({ name: 'lastUpdateBy' })
  @Field(() => User, { nullable: true })
  lastUpdatedBy?: User

  @OneToMany(() => Dog, (dog) => dog.user, { lazy: true })
  //@Field(() => [Dog])
  dogs: Dog[]

  @OneToMany(() => List, (list) => list.user)
  //@Field(() => [Dog])
  lists: List[]

}
