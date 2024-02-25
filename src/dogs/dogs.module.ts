import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsResolver } from './dogs.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';

@Module({
  providers: [DogsResolver, DogsService],
  imports: [TypeOrmModule.forFeature([Dog])],
  exports: [DogsService, TypeOrmModule]
})
export class DogsModule { }
