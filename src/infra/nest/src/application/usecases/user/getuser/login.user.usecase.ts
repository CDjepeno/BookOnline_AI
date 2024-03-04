import { UsersRepository } from 'src/domaine/repositories/user.repository';
import { GetUserRequest } from './get.user.request';
import { GetUserResponse } from './get.user.response';

export class LoginUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(request: GetUserRequest): Promise<GetUserResponse> {
    try {
      return await this.usersRepository.signIn(request);
    } catch (error) {
      throw error;
    }
  }
}
