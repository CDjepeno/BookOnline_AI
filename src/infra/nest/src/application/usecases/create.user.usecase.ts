import { UserModel } from 'src/domaine/model/user.model';
import { CreateUserDto } from '../../domaine/model/user.dtos';
import { UsersRepository } from '../../domaine/repositories/user.repository';
import { ClientSmsPort } from 'src/domaine/repositories/client.sms.port';
import { regexPhone } from 'src/utils/utils';

export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private clientSms: ClientSmsPort,
  ) {}

  async execute(request: CreateUserDto): Promise<UserModel> {
    try {
      if(!regexPhone.test(request.phone)) {
        throw new Error("Numero n'est pas valide")
      }
      this.clientSms.sendMessage(request.phone);
      return this.usersRepository.createUser(request);
    } catch (err) {
      throw new Error(err);
    }
  }
}
