import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = await this.usersRepository.create(user);
    return (
      await this.usersRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values(newUser)
        .returning('*')
        .execute()
    ).raw;
  }
}
