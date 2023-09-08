import { UserModel } from 'src/domaine/model/user.model';
import { CreateUserDto } from '../../domaine/model/user.dtos';
import { UsersRepository } from '../../domaine/repositories/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: CreateUserDto): Promise<UserModel> {
    return this.usersRepository.createUser(request);

    // try {
    //   const user = new UserDTO(
    //     request.email,
    //     request.password,
    //     request.firstName,
    //     request.lastName,
    //   );

    //   return await this.userRepository.createUser(user);
    // } catch (e: any) {
    //   throw new Error(e);
    // }
  }
}
