import { UserModel } from '../../domaine/model/user.model';
import { CreateUserDto } from '../../domaine/model/user.dtos';
import { UsersRepository } from '../../domaine/repositories/user.repository';
import { ClientSmsPort } from '../../domaine/repositories/client.sms.port';
import { InvalidPhoneNumberException } from 'src/domaine/errors/book.error';

export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private clientSms: ClientSmsPort,
  ) {}

  async execute(request: CreateUserDto): Promise<UserModel> {
    try {
      const regexPhone = /^((\+)33)[6-7](\d{2}){4}$/;
      if (!regexPhone.test(request.phone)) {
        throw new InvalidPhoneNumberException("Numero n'est pas valide");
      }
      this.clientSms.sendMessage(request.phone);

      return await this.usersRepository.createUser(request);
    } catch (error) {
      throw error;
    }
  }
}
