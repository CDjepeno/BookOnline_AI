import { UserDTO } from 'src/dtos/user.dtos';
import { UserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class createUser {
  constructor(private userRepository: UserRepository) {}

  async execute(request: UserDTO) {
    try {
      const user = new UserDTO(
        request.email,
        request.password,
        request.firstName,
        request.lastName,
      );

      await this.userRepository.createUser(user);
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
