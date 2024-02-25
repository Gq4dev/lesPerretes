import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ListDogService } from './list-dog.service';
import { ListDog } from './entities/list-dog.entity';
import { CreateListDogInput } from './dto/create-list-dog.input';
import { UpdateListDogInput } from './dto/update-list-dog.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Resolver(() => ListDog)
@UseGuards(JwtAuthGuard)
export class ListDogResolver {
  constructor(private readonly listDogService: ListDogService) { }

  @Mutation(() => ListDog)
  createListDog(
    @Args('createListDogInput') createListDogInput: CreateListDogInput,
  ): Promise<ListDog> {
    return this.listDogService.create(createListDogInput);
  }

  @Query(() => [ListDog], { name: 'listDog' })
  findAll() {
    return this.listDogService.findAll();
  }

  // @Query(() => ListDog, { name: 'listDog' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.listDogService.findOne(id);
  // }

  // @Mutation(() => ListDog)
  // updateListDog(@Args('updateListDogInput') updateListDogInput: UpdateListDogInput) {
  //   return this.listDogService.update(updateListDogInput.id, updateListDogInput);
  // }

  // @Mutation(() => ListDog)
  // removeListDog(@Args('id', { type: () => Int }) id: number) {
  //   return this.listDogService.remove(id);
  // }
}
