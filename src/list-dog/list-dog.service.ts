import { Injectable } from '@nestjs/common';
import { CreateListDogInput } from './dto/create-list-dog.input';
import { UpdateListDogInput } from './dto/update-list-dog.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ListDog } from './entities/list-dog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListDogService {


  constructor(
    @InjectRepository(ListDog)
    private readonly listDogsRepository: Repository<ListDog>
  ) { }

  async create(createListDogInput: CreateListDogInput): Promise<ListDog> {

    const { dogId, listId, ...rest } = createListDogInput

    const newListDog = this.listDogsRepository.create({
      ...rest,
      dog: { id: dogId },
      list: { id: listId }
    })

    return await this.listDogsRepository.save(newListDog)
  }

  async findAll():Promise<ListDog[]> {
    return this.listDogsRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} listDog`;
  }

  update(id: number, updateListDogInput: UpdateListDogInput) {
    return `This action updates a #${id} listDog`;
  }

  remove(id: number) {
    return `This action removes a #${id} listDog`;
  }
}
