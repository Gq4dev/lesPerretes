import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogsService } from 'src/dogs/dogs.service';
import { DogsModule } from 'src/dogs/dogs.module';
import { ListsModule } from 'src/lists/lists.module';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [TypeOrmModule.forFeature([User]), DogsModule, ListsModule],
  exports: [
    TypeOrmModule,
    UsersService
  ]
})
export class UsersModule { }
