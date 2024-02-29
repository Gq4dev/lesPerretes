import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerResolver } from './owner.resolver';
import { Owner } from './entities/owner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [OwnerResolver, OwnerService],
  imports: [TypeOrmModule.forFeature([Owner])],
  exports: [OwnerService, TypeOrmModule]
})
export class OwnerModule { }
