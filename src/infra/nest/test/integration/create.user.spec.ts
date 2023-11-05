import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepositoryTyperom } from '../../src/infras/services/user.repository.typeorm';
import { TwilioClient } from '../../src/infras/clients/twilio/twilio.client';
import { User } from '../../src/infras/entities/user.entity';
import { ConfigService } from '@nestjs/config';

describe('', () => {
  let moduleFixture: TestingModule;
  let service: UserRepositoryTyperom;

  const mockUserService = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((user) =>
        Promise.resolve({ id: Date.now(), ...user }),
      ),
  };

  beforeAll(async () => {
    moduleFixture = await Test.createTestingModule({
      providers: [
        UserRepositoryTyperom,
        TwilioClient,
        ConfigService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserService,
        },
      ],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserService)
      .compile();

    service = moduleFixture.get<UserRepositoryTyperom>(UserRepositoryTyperom);
  });

  describe('create user', () => {
    const userDetails = {
      email: 'test@test.fr',
      name: 'firstname',
      phone: '+33624552440',
      password: 'test',
    };

    const userData = {
      id: expect.any(Number),
      email: 'test@test.fr',
      name: 'firstname',
      phone: '+33624552440',
      password: 'test',
    };

    it('service should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should create a new user', async () => {
      expect(await service.createUser(userDetails)).toEqual(userData);
    });
  });

  afterAll(async () => {
    await moduleFixture.close();
  });
});
