import { AuthInput } from 'src/domaine/model/auth.input';
import { UsersRepository } from 'src/domaine/repositories/user.repository';

export class LoginUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(request: AuthInput) {
    try {
      return await this.usersRepository.signIn(request);
    } catch (error) {
      throw error;
    }
  }
}
