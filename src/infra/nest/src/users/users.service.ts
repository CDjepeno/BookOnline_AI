import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { UserDTO } from 'src/dtos/user.dtos';
// import { UserDTO } from "../../../../core/dtos/user.dtos"


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userDto: UserDTO) {
    try {
      const newUser = this.userRepository.create({ ...userDto });
      const err = await validate(newUser);
      if (err.length > 0) {
        return err;
      } else {
        return await 
this.userRepository.save
(newUser);
      }
    } catch (error) {
      throw new Error(error);
    }
  }
} 