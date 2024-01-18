import { CreateUserDto } from '../model/user.dtos';
import { UserModel } from '../model/user.model';

export interface UsersRepository {
  createUser(user: CreateUserDto): Promise<UserModel>;
  loginUser(email: string): Promise<UserModel>;
}
