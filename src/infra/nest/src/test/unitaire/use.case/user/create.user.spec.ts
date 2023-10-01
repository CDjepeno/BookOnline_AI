import { CreateUserUseCase } from '../../../../application/usecases/create.user.usecase';
import { UsersRepository } from '../../../../domaine/repositories/user.repository';
import { ClientSmsPort } from '../../../../domaine/repositories/client.sms.port';
import { mock, Mock } from 'ts-jest-mocker';
import { userDataDto, userDataResponse } from '../../data/userData';

describe('Rule: create user', () => {
  let createUserUseCase: CreateUserUseCase;
  let mockUserProvider: Mock<UsersRepository>;
  let mockClientProvider: Mock<ClientSmsPort>;

  beforeEach(() => {
    mockUserProvider = mock<UsersRepository>();
    mockClientProvider = mock<ClientSmsPort>();

    mockUserProvider.createUser.mockImplementation(() =>
      Promise.resolve(userDataResponse),
    );

    createUserUseCase = new CreateUserUseCase(
      mockUserProvider,
      mockClientProvider,
    );
  });

  it('Number should be valide', async () => {
    const result = await createUserUseCase.execute(userDataDto);
    expect(result).toEqual(userDataResponse);
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
      expect(err instanceof Error).toBeTruthy();
      expect(err.message).toBe("Error: Numero n'est pas valide");
    }
  });
});

