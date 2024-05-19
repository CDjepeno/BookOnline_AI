import { mock, Mock } from 'ts-jest-mocker';
import { CreateUserUseCase } from '../../../../application/usecases/user/adduser/add.user.usecase';
import { InvalidPhoneNumberException } from '../../../../domaine/errors/book.error';
import { ClientSmsPort } from '../../../../domaine/repositories/client.sms.port';
import { UsersRepository } from '../../../../domaine/repositories/user.repository';
import { userDataDto, userDataResponse } from '../../data/userData';

describe('Rule: create user', () => {
  let createUserUseCase: CreateUserUseCase;
  let mockUserProvider: Mock<UsersRepository>;
  let mockClientProvider: Mock<ClientSmsPort>;

  beforeEach(() => {
    mockUserProvider = mock<UsersRepository>();
    mockClientProvider = mock<ClientSmsPort>();

    mockUserProvider.createUser.mockImplementation(async () =>
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
        email: '@test.fr',
        name: 'firstname0',
        phone: '0624552440',
        password: 'test',
      });
    } catch (err) {
      expect(err instanceof InvalidPhoneNumberException).toBeTruthy();
      expect(err.message).toBe("Numero n'est pas valide");
    }
  });
});
