import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { User } from 'src/infras/models/user.model';
import { UserRepositoryTyperom } from 'src/infras/services/user.repository.typeorm';
import { GenericContainer, StartedTestContainer } from 'testcontainers';

describe('User Repository', () => {
  let app: INestApplication;
  let repository: UserRepositoryTyperom;
  let module: TestingModule;
  let container: StartedTestContainer;

  beforeAll(async () => {
    container = await new GenericContainer('mysql')
      .withEnvironment({ username_con: 'root' })
      .withEnvironment({ password_con: 'Azerty_12' })
      .start();
  });

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'Azerty_12',
          database: 'testDB',
          entities: [join(__dirname, '**', '*.entity.{ts,js}')],
          autoLoadEntities: true,
          synchronize: false,
        }),
        TypeOrmModule.forFeature([User]),

        ConfigModule,
      ],
      providers: [UserRepositoryTyperom],
    }).compile();
    repository = module.get<UserRepositoryTyperom>(UserRepositoryTyperom);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
    if (container) {
      await container.stop();
    }
  });
});
