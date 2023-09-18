import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersRepository } from 'src/domaine/repositories/user.repository';
import { CreateUserDto } from 'src/domaine/model/user.dtos';
import { UserModel } from 'src/domaine/model/user.model';

@Injectable()
export class UserRepositoryTyperom implements UsersRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
    const user = new User();
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    user.phone = createUserDto.phone;
    return this.repository.save(user);
  }
}
