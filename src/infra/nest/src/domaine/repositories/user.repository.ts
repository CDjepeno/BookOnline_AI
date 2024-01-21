import { AuthDto } from '../model/auth.dto';
import { CreateUserDto } from '../model/user.dtos';
import { UserModel } from '../model/user.model';

export interface UsersRepository {
  createUser(user: CreateUserDto): Promise<UserModel>;
  signIn(user: AuthDto): Promise<string>;
}
