import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { OwnerService } from './owner.service';
import { Owner } from './entities/owner.entity';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Currentuser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Owner)
@UseGuards(JwtAuthGuard)

export class OwnerResolver {
  constructor(private readonly ownerService: OwnerService) { }

  @Mutation(() => Owner, { name: 'createOwner' })
  async createOwner(
    @Args('createOwnerInput') createOwnerInput: CreateOwnerInput,
    @Currentuser() user: User
  ): Promise<Owner> {
    return this.ownerService.create(createOwnerInput);
  }

  @Query(() => [Owner], { name: 'owners' })
  async owners(
    @Currentuser() user: User
  ): Promise<Owner[]> {
    return this.ownerService.findAll();
  }


  @Query(() => Owner, { name: 'owner' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Currentuser() user: User
  ): Promise<Owner> {
    return this.ownerService.findOne(id);
  }

  // @Mutation(() => Owner)
  // updateOwner(@Args('updateOwnerInput') updateOwnerInput: UpdateOwnerInput) {
  //   return this.ownerService.update(updateOwnerInput.id, updateOwnerInput);
  // }

  // @Mutation(() => Owner)
  // removeOwner(@Args('id', { type: () => Int }) id: number) {
  //   return this.ownerService.remove(id);
  // }
}
