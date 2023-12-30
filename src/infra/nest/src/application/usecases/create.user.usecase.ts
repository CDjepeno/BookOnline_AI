import { UserModel } from '../../domaine/model/user.model';
import { CreateUserDto } from '../../domaine/model/user.dtos';
import { UsersRepository } from '../../domaine/repositories/user.repository';
import { ClientSmsPort } from '../../domaine/repositories/client.sms.port';
// import { InvalidPhoneNumberException } from '../../domaine/errors/book.error';

export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private clientSms: ClientSmsPort,
  ) {}

  async execute(request: CreateUserDto): Promise<UserModel> {
    try {
      this.clientSms.sendMessage(request.phone);

      return await this.usersRepository.createUser(request);
    } catch (error) {
      throw error;
    }
  }
}
