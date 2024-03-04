import { AddUserResponse } from 'src/application/usecases/user/adduser/add.user.response';
import { CurrentUserResponse } from 'src/application/usecases/user/getuser/current.user.response';
import { GetUserRequest } from 'src/application/usecases/user/getuser/get.user.request';
import { GetUserResponse } from 'src/application/usecases/user/getuser/get.user.response';
import { User } from 'src/domaine/entities/User';

export interface UsersRepository {
  addUser(user: User): Promise<AddUserResponse>;
  signIn(user: GetUserRequest): Promise<GetUserResponse>;
  getCurrentUser(email: string): Promise<CurrentUserResponse>;
}
