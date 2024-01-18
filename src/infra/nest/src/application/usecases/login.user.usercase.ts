import { UsersRepository } from 'src/domaine/repositories/user.repository';

export default class LoginUserUseCase {
  constructor(private userRepository: UsersRepository) {}
  async execute(request: string) {
    try {
      return await this.userRepository.loginUser(request);
    } catch (error) {
      throw error;
    }
  }
}
