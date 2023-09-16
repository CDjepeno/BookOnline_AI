import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersRepository } from 'src/domaine/repositories/user.repository';
import { CreateUserDto } from 'src/domaine/model/user.dtos';
import { UserModel } from 'src/domaine/model/user.model';
import { TwilioClient } from 'nestjs-twilio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserRepositoryTyperom implements UsersRepository {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private repository: Repository<User>,

    @Inject()
    private client: TwilioClient,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
    const user = new User();
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    user.phone = createUserDto.phone;
    this.client.messages.create({
      body: 'Votre compte a bien été crée',
      from: this.configService.get(
        'TWILIO_SENDER_PHONE_NUMBER'),
      to: user.phone,
    });
    return this.repository.save(user);
  }
}
