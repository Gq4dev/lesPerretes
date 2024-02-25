import { Module } from '@nestjs/common';
import { ListDogService } from './list-dog.service';
import { ListDogResolver } from './list-dog.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListDog } from './entities/list-dog.entity';

@Module({
  providers: [ListDogResolver, ListDogService],
  imports: [TypeOrmModule.forFeature([ListDog])],
  exports: [ListDogService, TypeOrmModule]
})
export class ListDogModule { }
