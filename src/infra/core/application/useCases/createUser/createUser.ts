import { UserDTO } from 'src/core/dtos/user.dtos';
import { IUserRepository } from 'src/core/repository/userRepository';

export class createUser {
  constructor(private repository: IUserRepository) {}

  async execute(request: UserDTO) {
    try {
      const user = new UserDTO(
        request.email,
        request.password,
        request.firstName,
        request.lastName,
      );

      return await this.repository.createUser(user);
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
