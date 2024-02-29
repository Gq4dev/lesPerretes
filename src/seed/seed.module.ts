import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { DogsModule } from 'src/dogs/dogs.module';
import { OwnerModule } from 'src/owner/owner.module';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [ConfigModule, UsersModule, DogsModule, OwnerModule]
})
export class SeedModule { }
