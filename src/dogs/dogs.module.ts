import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsResolver } from './dogs.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { OwnerModule } from 'src/owner/owner.module';

@Module({
  providers: [DogsResolver, DogsService],
  imports: [TypeOrmModule.forFeature([Dog]), OwnerModule],
  exports: [DogsService, TypeOrmModule]
})
export class DogsModule { }
