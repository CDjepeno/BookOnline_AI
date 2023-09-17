import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersRepository } from 'src/domaine/repositories/user.repository';
import { CreateUserDto } from 'src/domaine/model/user.dtos';
import { UserModel } from 'src/domaine/model/user.model';
import Twilio from 'twilio/lib/rest/Twilio';

@Injectable()
export class UserRepositoryTyperom implements UsersRepository {
  private twilioClient: Twilio;
  accountSid = process.env.TWILIO_ACCOUNT_SID;
  authToken = process.env.TWILIO_AUTH_TOKEN;
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}



  async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
    this.twilioClient = new Twilio(this.accountSid, this.authToken)
    const user = new User();
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    user.phone = createUserDto.phone;
    this.twilioClient.messages.create({
      body: 'Votre compte a bien été crée',
      from: process.env.TWILIO_SENDER_PHONE_NUMBER,
      to: user.phone,
    });
    return this.repository.save(user);
  }
}
