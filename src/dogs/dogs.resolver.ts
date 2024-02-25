import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { DogsService } from './dogs.service';
import { Dog } from './entities/dog.entity';
import { CreateDogInput, UpdateDogInput } from './dto/inputs/';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Currentuser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { PaginationArgs, SearchArgs } from 'src/common/dto/args/';


@Resolver(() => Dog)
@UseGuards(JwtAuthGuard)
export class DogsResolver {
  constructor(private readonly dogsService: DogsService) { }

  @Mutation(() => Dog, { name: 'createDog' })
  async createDog(
    @Args('createDogInput') createDogInput: CreateDogInput,
    @Currentuser() user: User
  ): Promise<Dog> {

    return this.dogsService.create(createDogInput, user);
  }

  @Query(() => [Dog], { name: 'dogs' })
  async findAll(
    @Currentuser() user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs
  ): Promise<Dog[]> {

    return this.dogsService.findAll(user, paginationArgs, searchArgs);
  }

  @Query(() => Dog, { name: 'dog' })
 async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Currentuser() user: User
  ): Promise<Dog> {
    return this.dogsService.findOne(id, user);
  }

  @Mutation(() => Dog)
  updateDog(
    @Args('updateDogInput') updateDogInput: UpdateDogInput,
    @Currentuser() user: User
  ): Promise<Dog> {
    return this.dogsService.update(updateDogInput.id, updateDogInput, user);
  }

  @Mutation(() => Dog)
  removeDog(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Currentuser() user: User
  ): Promise<Dog> {
    return this.dogsService.remove(id, user);
  }
}
