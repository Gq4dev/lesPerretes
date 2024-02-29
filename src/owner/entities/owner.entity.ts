// src/owners/entities/owner.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Dog } from 'src/dogs/entities/dog.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@Entity({ name: 'owners' })
@ObjectType()
export class Owner {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  phone: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  email: string;

  @OneToMany(() => Dog, dog => dog.owner)
  @Field(() => [Dog])
  dogs: Dog[];
}