import { AuthInput } from 'src/domaine/model/auth.input';
import { AuthResponse } from 'src/domaine/model/auth.response';
import { UsersRepository } from 'src/domaine/repositories/user.repository';

export class LoginUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(request: AuthInput): Promise<AuthResponse> {
    try {
      return await this.usersRepository.signIn(request);
    } catch (error) {
      throw error;
    }
  }
}
