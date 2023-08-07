import { UserDTO } from 'src/core/dtos/user.dtos';
import { IUserRepository } from 'src/core/repository/userRepository';
import { CreateUserResponse } from './createUserResponse';

export class createUser {
  constructor(private repository: IUserRepository) {}

  async execute(request: UserDTO) {
    try {
      const response = new CreateUserResponse();

      const user = new UserDTO(
        request.email,
        request.password,
        request.firstName,
        request.lastName,
      );

      await this.repository.createUser(user);

      response.message = 'Le user a bien été ajouté';
      return response;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
