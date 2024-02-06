import { AuthInput } from '../model/auth.input';
import { AuthResponse } from '../model/auth.response';
import { CurrentUserResponse } from '../model/current.user.response';
import { CreateUserDto } from '../model/user.dtos';
import { UserModel } from '../model/user.model';

export interface UsersRepository {
  createUser(user: CreateUserDto): Promise<UserModel>;
  signIn(user: AuthInput): Promise<AuthResponse>;
  getCurrentUser(email: string): Promise<CurrentUserResponse>;
}
