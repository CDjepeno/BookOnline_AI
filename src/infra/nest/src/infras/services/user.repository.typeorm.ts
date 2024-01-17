import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../../domaine/repositories/user.repository';
import { CreateUserDto } from '../../domaine/model/user.dtos';
import { UserModel } from '../../domaine/model/user.model';
import * as bcrypt from 'bcrypt';
import NodemailerClient from '../clients/nodemailer/nodemailer.client';

@Injectable()
export class UserRepositoryTyperom implements UsersRepository {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    private nodeMailerClient: NodemailerClient,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserModel> {
    const user = new User();
    user.email = createUserDto.email;
    user.password = await bcrypt.hash(createUserDto.password, 10);
    user.name = createUserDto.name;
    user.phone = createUserDto.phone;
    this.nodeMailerClient.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      from: {
        name: 'OnlineBook',
        email: process.env.MAIL_FROM,
      },
      subject: `Confirmation de votre inscription`,
      body: `Bonjour ${user.name}, \nVotre compte a bien été crée`,
    });
    return this.repository.save(user);
  }
}
