import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create.dto';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async findOneAuth(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['password'],
    });
  }

  findOne(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}
