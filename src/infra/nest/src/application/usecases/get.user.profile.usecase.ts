import { UserCurrentResponse } from 'src/domaine/model/user.current.response';
import { UsersRepository } from 'src/domaine/repositories/user.repository';

export class GetUserProfileUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(email: string): Promise<UserCurrentResponse> {
    try {
      const user = await this.usersRepository.getProfile(email);
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
