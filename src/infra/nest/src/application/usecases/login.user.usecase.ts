import { AuthDto } from 'src/domaine/model/auth.dto';
import { UsersRepository } from 'src/domaine/repositories/user.repository';

export class LoginUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(request: AuthDto) {
    try {
      return await this.usersRepository.signIn(request);
    } catch (error) {
      throw error;
    }
  }
}
