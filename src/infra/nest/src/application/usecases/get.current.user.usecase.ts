import { CurrentUserResponse } from 'src/domaine/model/current.user.response';
import { UsersRepository } from 'src/domaine/repositories/user.repository';

export class GetCurrentUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(email: string): Promise<CurrentUserResponse> {
    try {
      const user = await this.usersRepository.getCurrentUser(email);
      const responses = {
        name: user.name,
        email: user.email,
        phone: user.phone,
      };
      return responses;
    } catch (error) {
      throw error;
    }
  }
}
