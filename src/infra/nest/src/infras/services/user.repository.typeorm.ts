import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersRepository } from 'src/domaine/repositories/user.repository';
import { CreateUserDto } from 'src/domaine/model/user.dtos';
import { UserModel } from 'src/domaine/model/user.model';
import Twilio from 'twilio/lib/rest/Twilio';
import { TwilioClient } from '../clients/twilio/twilio.client';

@Injectable()
export class UserRepositoryTyperom implements UsersRepository {
  constructor(
    private twilioClient: TwilioClient,
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}



  async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
    const user = new User();
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    user.phone = createUserDto.phone;
    this.twilioClient.sendMessage(user.phone)
    return this.repository.save(user);
  }
}
