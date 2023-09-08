import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersRepository } from 'src/domaine/repositories/user.repository';
import { CreateUserDto } from 'src/domaine/model/user.dtos';
import { UserModel } from 'src/domaine/model/user.model';

@Injectable()
export class UserRepositoryTyperom implements UsersRepository {
  constructor(@InjectRepository(User) 
  private repository: Repository<User>) 
  {}

  async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
    const user = new User();
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    return this.repository.save(user);
  }

  private toUser(userEntity: User): UserModel {
    const user: UserModel = new UserModel();

    user.id = userEntity.id;
    user.email = userEntity.email;
    user.name = userEntity.name;
    user.password = userEntity.password;
    user.created_at = userEntity.created_at;
    user.updated_at = userEntity.updated_at;

    return user;
  }
}
