import { UserModel } from '../../domaine/model/user.model';
import { CreateUserDto } from '../../domaine/model/user.dtos';
import { UsersRepository } from '../../domaine/repositories/user.repository';
import { InvalidPhoneNumberException } from 'src/domaine/errors/book.error';
import NodemailerClient from 'src/infras/clients/nodemailer/nodemailer.client';

export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private nodemailerClient: NodemailerClient,
  ) {}

  async execute(request: CreateUserDto): Promise<UserModel> {
    try {
      const regexPhone = /^((\+)33)|(0)[6-7](\d{2}){4}$/;
      if (!regexPhone.test(request.phone)) {
        throw new InvalidPhoneNumberException("Numero n'est pas valide");
      }

      await this.nodemailerClient.sendMail({
        to: {
          name: request.name,
          email: request.email,
        },
        from: {
          name: 'Livraison Express',
          email: process.env.MAIL_FROM,
        },
        subject: `Confirmation de votre inscription`,
        body: `Bonjour ${request.name}, \nVotre compte a`,
      });

      return await this.usersRepository.createUser(request);
    } catch (error) {
      throw error;
    }
  }
}
