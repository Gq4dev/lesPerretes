import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDogInput } from './dto/inputs/create-dog.input';
import { UpdateDogInput } from './dto/inputs/update-dog.input';
import { Dog } from './entities/dog.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { PaginationArgs } from 'src/common/dto/args/pagination.args';
import { SearchArgs } from 'src/common/dto/args';

@Injectable()
export class DogsService {

  constructor(
    @InjectRepository(Dog)
    private readonly dogsRepository: Repository<Dog>
  ) { }


  async create(createDogInput: CreateDogInput, user: User): Promise<Dog> {
    const newDog = this.dogsRepository.create({ ...createDogInput, user })

    return await this.dogsRepository.save(newDog)

  }

  async findAll(user: User, paginationArgs: PaginationArgs, searchArgs: SearchArgs): Promise<Dog[]> {

    const { limit, offset } = paginationArgs
    const { search } = searchArgs

    const queryBuilder = this.dogsRepository.createQueryBuilder()
      .take(limit)
      .skip(offset)
      .where(`"userId" = :userId`, { userId: user.id })

    if (search) {
      queryBuilder.andWhere('LOWER(name) like :name', { name: `%${search.toLowerCase()}%` })
    }

    return queryBuilder.getMany()

    //ENFOQUE 1
    // return this.dogsRepository.find({
    //   take: limit,
    //   skip: offset,
    //   where: {
    //     user: {
    //       id: user.id
    //     }
    //   }
    // })


  }

  async findOne(id: string, user: User): Promise<Dog> {

    const dog = await this.dogsRepository.findOneBy({
      id,
      user: {
        id: user.id
      }
    })

    if (!dog) throw new NotFoundException(`Dog with id: ${id} not found`)



    return dog
  }

  async update(id: string, updateDogInput: UpdateDogInput, user: User): Promise<Dog> {

    await this.findOne(id, user)

    const dog = await this.dogsRepository.preload(updateDogInput)

    if (!dog) throw new NotFoundException(`Dog with id: ${id} not found`)

    return this.dogsRepository.save(dog)
  }

  async remove(id: string, user: User): Promise<Dog> {
    const dog = await this.findOne(id, user)

    await this.dogsRepository.remove(dog)

    return { ...dog, id }
  }

  async dogCountByUser(user: User): Promise<number> {
    return this.dogsRepository.count({
      where: {
        user: {
          id: user.id
        }
      }
    })
  }
}
