import { Resolver, Query, Mutation, Args, Int, ID, ResolveField, Parent } from '@nestjs/graphql';
import { ListsService } from './lists.service';
import { List } from './entities/list.entity';
import { CreateListInput } from './dto/create-list.input';
import { UpdateListInput } from './dto/update-list.input';
import { User } from 'src/users/entities/user.entity';
import { Currentuser } from 'src/auth/decorators/current-user.decorator';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginationArgs, SearchArgs } from 'src/common/dto/args';
import { ListDog } from 'src/list-dog/entities/list-dog.entity';
import { ListDogService } from 'src/list-dog/list-dog.service';

@Resolver(() => List)
@UseGuards(JwtAuthGuard)

export class ListsResolver {
  constructor(
    private readonly listsService: ListsService,
    private readonly listDogService: ListDogService
  ) { }

  @Mutation(() => List, { name: 'createList' })
  async createList(
    @Args('createListInput') createListInput: CreateListInput,
    @Currentuser() user: User
  ): Promise<List> {

    return this.listsService.create(createListInput, user);
  }

  @Query(() => [List], { name: 'lists' })
  async findAll(
    @Currentuser() user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs
  ) {
    return this.listsService.findAll(user, paginationArgs, searchArgs);
  }

  @Query(() => List, { name: 'list' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Currentuser() user: User
  ): Promise<List> {
    return this.listsService.findOne(id, user);
  }

  @Mutation(() => List)
  updateList(
    @Args('updateListInput') updateListInput: UpdateListInput,
    @Currentuser() user: User
  ): Promise<List> {
    return this.listsService.update(updateListInput.id, updateListInput, user);
  }

  @Mutation(() => List)
  removeList(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @Currentuser() user: User
  ): Promise<List> {
    return this.listsService.remove(id, user);
  }

  @ResolveField(() => [ListDog], { name: 'dogs' })
  async getListDogs(
    @Parent() list: List,
  ): Promise<ListDog[]> {
    return this.listDogService.findAll()

  }
}
