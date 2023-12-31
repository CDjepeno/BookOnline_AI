import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../../domaine/repositories/user.repository';
import { CreateUserDto } from '../../domaine/model/user.dtos';
import { UserModel } from '../../domaine/model/user.model';
import { TwilioClient } from '../clients/twilio/twilio.client';

@Injectable()
export class UserRepositoryTyperom implements UsersRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private twilioClient: TwilioClient,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
    const user = new User();
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    user.phone = createUserDto.phone;
    this.twilioClient.sendMessage(user.phone);
    return this.repository.save(user);
  }
}
