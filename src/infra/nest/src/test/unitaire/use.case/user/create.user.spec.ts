import { CreateUserUseCase } from '../../../../application/usecases/create.user.usecase';
import { UsersRepository } from '../../../../domaine/repositories/user.repository';
import { ClientSmsPort } from '../../../../domaine/repositories/client.sms.port';
import { mock, Mock } from 'ts-jest-mocker';
import { BadRequest } from '../../../../infras/errors/onlinebook.error';

describe('Rule: create user', () => {
  let createUserUseCase: CreateUserUseCase;
  let mockUserProvider: Mock<UsersRepository>;
  let mockClientProvider: Mock<ClientSmsPort>;

  beforeEach(() => {
    mockUserProvider = mock<UsersRepository>();
    mockClientProvider = mock<ClientSmsPort>();

    mockUserProvider.createUser.mockImplementation(() =>
      Promise.resolve({
        id: 4,
        email: 'test@test.fr',
        name: 'firstname',
        phone: '+33624552440',
        password: 'test',
        created_at: new Date('2023-09-25T22:01:13.483Z'),
        updated_at: null,
      }),
    );

    createUserUseCase = new CreateUserUseCase(
      mockUserProvider,
      mockClientProvider,
    );
  });

  it('Number should be valide', async () => {
    const result = await createUserUseCase.execute({
      email: 'test@test.fr',
      name: 'firstname',
      phone: '+33624552440',
      password: 'test',
    });
    expect(result).toEqual({
      id: 4,
      email: 'test@test.fr',
      name: 'firstname',
      phone: '+33624552440',
      password: 'test',
      created_at: new Date('2023-09-25T22:01:13.483Z'),
      updated_at: null,
    });
  });

  it('Number should not valide', async () => {
    try {
      await createUserUseCase.execute({
        email: 'test@test.fr',
        name: 'firstname',
        phone: '0624552440',
        password: 'test',
      });
    } catch (err) {
      expect(err instanceof BadRequest).toBeTruthy();
      expect(err.message).toBe("Error: Numero n'est pas valide");
      expect(err.statusCode).toBe(403);
    }
  });
});

