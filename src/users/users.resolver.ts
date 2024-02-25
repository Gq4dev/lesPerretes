import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, ID, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

import { ValidRolesArgs } from './dto/args/roles.arg';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Currentuser } from 'src/auth/decorators/current-user.decorator';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { UpdateUserInput } from './dto/update-user.input';
import { DogsService } from 'src/dogs/dogs.service';
import { Dog } from 'src/dogs/entities/dog.entity';
import { PaginationArgs, SearchArgs } from 'src/common/dto/args';
import { ListsService } from 'src/lists/lists.service';
import { List } from 'src/lists/entities/list.entity';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly dogsService: DogsService,
    private readonly listsService: ListsService
  ) { }


  @Query(() => [User], { name: 'users' })
  findAll(
    @Args() validRoles: ValidRolesArgs,
    @Currentuser([ValidRoles.admin]) user: User
  ): Promise<User[]> {

    return this.usersService.findAll(validRoles.roles);
  }

  @Query(() => User, { name: 'user' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Currentuser([ValidRoles.admin]) user: User
  ): Promise<User> {
    return this.usersService.findOneById(id);
  }


  @Mutation(() => User, { name: 'updateUser' })
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @Currentuser([ValidRoles.admin]) user: User
  ): Promise<User> {
    return this.usersService.update(updateUserInput.id, updateUserInput, user)
  }

  @Mutation(() => User, { name: 'blockUser' })
  blockUser(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Currentuser([ValidRoles.admin]) user: User
  ): Promise<User> {
    return this.usersService.block(id, user);
  }

  @ResolveField(() => Int, { name: 'dogCount' })
  async dogCount(
    @Currentuser([ValidRoles.admin]) adminUser: User,
    @Parent() user: User,
  ): Promise<number> {
    return this.dogsService.dogCountByUser(user)
  }

  @ResolveField(() => Int, { name: 'listCount' })
  async listCount(
    @Currentuser([ValidRoles.admin]) adminUser: User,
    @Parent() user: User,
  ): Promise<number> {
    return this.listsService.listCountByUser(user)
  }



  @ResolveField(() => [Dog], { name: 'dogs' })
  async getDogsByUser(
    @Currentuser([ValidRoles.admin]) adminUser: User,
    @Parent() user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs
  ): Promise<Dog[]> {
    return this.dogsService.findAll(user, paginationArgs, searchArgs)
  }


  @ResolveField(() => [List], { name: 'lists' })
  async ListDogsByUser(
    @Currentuser([ValidRoles.admin]) adminUser: User,
    @Parent() user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs
  ): Promise<List[]> {
    return this.listsService.findAll(user, paginationArgs, searchArgs)
  }
}