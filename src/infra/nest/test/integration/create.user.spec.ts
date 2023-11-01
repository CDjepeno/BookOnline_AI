import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { RepositoriesModule } from '../../src/infras/services/repositories.module';
import { UserRepositoryTyperom } from '../../src/infras/services/user.repository.typeorm';
import { TwilioClient } from '../../src/infras/clients/twilio/twilio.client';
import { Repository } from 'typeorm';
import { User } from '../../src/infras/entities/user.entity';
import { TwilioModules } from '../../src/infras/clients/twilio/twilio.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('', () => {
  let app: INestApplication;
  let usersRepository: UserRepositoryTyperom;

  const mockUserRepo = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((user) =>
        Promise.resolve({ id: Date.now(), ...user }),
      ),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'Azerty_12',
          database: 'testDB',
          entities: ['./**/*.entity.ts'],
          synchronize: false,
        }),
      ],
      providers: [
        UserRepositoryTyperom,
        TwilioClient,
        ConfigService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepo,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    usersRepository = moduleFixture.get<UserRepositoryTyperom>(
      UserRepositoryTyperom,
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(usersRepository).toBeDefined()
  });
});
