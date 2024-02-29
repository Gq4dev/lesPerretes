import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class OwnerService {

  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>
  ) { }


  async create(createOwnerInput: CreateOwnerInput): Promise<Owner> {


    const newOwner = this.ownerRepository.create({ ...createOwnerInput })

    return await this.ownerRepository.save(newOwner)
  }

  async findAll() {
    return this.ownerRepository.find({ relations: ['dogs'] });
  }


  async findOne(id: string) {

    const owner = this.ownerRepository.findOne({
      where: { id },
      relations: ['dogs'],
    });

    if (!owner) throw new NotFoundException(`Owner with id: ${id} not found`)

    return owner
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return `This action updates a #${id} owner`;
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
