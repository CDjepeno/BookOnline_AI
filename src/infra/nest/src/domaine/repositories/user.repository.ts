import { AuthInput } from '../model/auth.input';
import { AuthResponse } from '../model/auth.response';
import { UserCurrentResponse } from '../model/user.current.response';
import { CreateUserDto } from '../model/user.dtos';
import { UserModel } from '../model/user.model';

export interface UsersRepository {
  createUser(user: CreateUserDto): Promise<UserModel>;
  signIn(user: AuthInput): Promise<AuthResponse>;
  getProfile(email: string): Promise<UserCurrentResponse>;
}
