import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Dog } from 'src/dogs/entities/dog.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { SEED_DOGS, SEED_USERS } from './data/seed-data';
import { DogsService } from 'src/dogs/dogs.service';

@Injectable()
export class SeedService {

    private isProd: boolean

    constructor(
        private readonly configService: ConfigService,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        private readonly userServices: UsersService,

        @InjectRepository(Dog)
        private readonly dogRepository: Repository<Dog>,

        private readonly dogsServices: DogsService,

    ) {
        this.isProd = configService.get('STATE') === 'prod'
    }

    async executeSeed() {

        if (this.isProd) {
            throw new UnauthorizedException('We cant run seed in PROD')
        }
        //Clean Database
        await this.deleteDatabase()

        //Load Users
        const user = await this.loadUsers()

        const dogs = await this.loadDogs(user)
        return true
    }

    async deleteDatabase() {
        //delete Dogs
        await this.dogRepository.createQueryBuilder()
            .delete()
            .where({})
            .execute()
        //delete Users
        await this.userRepository.createQueryBuilder()
            .delete()
            .where({})
            .execute()
    }

    async loadUsers(): Promise<User> {
        const users = []

        for (const user of SEED_USERS) {
            users.push(await this.userServices.create(user))
        }
        return users[0]
    }

    async loadDogs(user: User): Promise<void> {
        const dogsPromises = []

        for (const dog of SEED_DOGS) {
            dogsPromises.push(this.dogsServices.create(dog, user))
        }
        await Promise.all(dogsPromises)
    }
}
