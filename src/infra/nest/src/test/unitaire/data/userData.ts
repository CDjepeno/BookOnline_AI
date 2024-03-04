import { AddUserRequest } from 'src/application/usecases/user/adduser/add.user.request';
import { AddUserResponse } from 'src/application/usecases/user/adduser/add.user.response';

export const userDataDto: AddUserRequest = {
  email: 'test@test.fr',
  name: 'firstname',
  phone: '+33624552440',
  password: 'test',
};

export const userDataResponse: AddUserResponse = {
  id: 4,
  email: 'test@test.fr',
  name: 'firstname',
  phone: '+33624552440',
  password: 'test',
  created_at: new Date(),
  updated_at: new Date(),
};
