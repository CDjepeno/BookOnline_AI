import { CreateUserDto } from '../../../domaine/model/user.dtos';
import { UserModel } from '../../../domaine/model/user.model';

export const userDataDto: CreateUserDto = {
  email: 'test@test.fr',
  name: 'firstname',
  phone: '+33624552440',
  password: 'test',
};

export const userDataResponse: UserModel = {
  id: 4,
  email: 'test@test.fr',
  name: 'firstname',
  phone: '+33624552440',
  password: 'test',
  created_at: new Date(),
  updated_at: null,
};
