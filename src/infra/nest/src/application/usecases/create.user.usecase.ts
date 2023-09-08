import { UserModel } from 'src/domaine/model/user.model';
import { CreateUserDto } from '../../domaine/model/user.dtos';
import { UsersRepository } from '../../domaine/repositories/user.repository';

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: CreateUserDto): Promise<UserModel> {
    return this.usersRepository.createUser(request);
  }
}
