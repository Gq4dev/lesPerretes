import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsResolver } from './lists.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { ListDogService } from 'src/list-dog/list-dog.service';
import { ListDogModule } from 'src/list-dog/list-dog.module';


@Module({
  providers: [ListsResolver, ListsService],
  imports: [
    TypeOrmModule.forFeature([List]), ListDogModule
  ],
  exports: [
    TypeOrmModule,
    ListsService
  ]
})
export class ListsModule { }
