import { AuthInput } from '../model/auth/auth.input';
import { AuthResponse } from '../model/auth/auth.response';
import { CurrentUserResponse } from '../model/auth/current.user.response';
import { CreateUserDto } from '../model/user/user.dtos';
import { UserModel } from '../model/user/user.model';

export interface UsersRepository {
  createUser(user: CreateUserDto): Promise<UserModel>;
  signIn(user: AuthInput): Promise<AuthResponse>;
  getCurrentUser(email: string): Promise<CurrentUserResponse>;
}
