import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../../domaine/repositories/user.repository';
import { CreateUserDto } from '../../domaine/model/user.dtos';
import { UserModel } from '../../domaine/model/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepositoryTyperom implements UsersRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
    const user = new User();
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    user.name = createUserDto.name;
    user.phone = createUserDto.phone;
    return this.repository.save(user);
  }

  async loginUser(email: string): Promise<UserModel> {
    const userByEmail = await this.repository.findOne({
      where: { email: email },
    });
    if (!userByEmail) {
      return null;
    }
    return userByEmail;
  }
}
