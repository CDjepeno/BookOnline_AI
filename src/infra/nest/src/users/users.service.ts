import { Inject, Injectable, ValidationError } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { UserDTO } from '../core/dtos/user.dtos';
import { IUserRepository } from 'src/core/repository/userRepository';

@Injectable()
export class UsersService implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(user: UserDTO) {
    try {
      const newUser = this.userRepository.create(user);
      const err = await validate(newUser);
      if (err.length > 0) {
        return err;
      } else {
        await this.userRepository.save(newUser);
        return 'New User';
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
