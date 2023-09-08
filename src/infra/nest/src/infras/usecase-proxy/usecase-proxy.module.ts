import { DynamicModule, Module } from '@nestjs/common';

import { UseCaseProxy } from './usecase-proxy';
import { RepositoriesModule } from '../services/repositories.module';
import { UserRepositoryTyperom } from '../services/user.repository.typeorm';
import { CreateUserUseCase } from 'src/application/usecases/create.user.usecase';

@Module({
  imports: [RepositoriesModule],
})
export class UsecaseProxyModule {
  static CREATE_USER_USE_CASE = 'createUserUsecaseProxy';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        {
          inject: [UserRepositoryTyperom],
          provide: UsecaseProxyModule.CREATE_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryTyperom) =>
            new UseCaseProxy(new CreateUserUseCase(userRepository)),
        },
      ],
      exports: [UsecaseProxyModule.CREATE_USER_USE_CASE],
    };
  }
}
