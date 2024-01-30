import { DynamicModule, Module } from '@nestjs/common';

import { CreateUserUseCase } from 'src/application/usecases/create.user.usecase';
import { GetUserProfileUseCase } from 'src/application/usecases/get.user.profile.usecase';
import { LoginUserUseCase } from 'src/application/usecases/login.user.usecase';
import NodemailerClient from '../clients/nodemailer/nodemailer.client';
import { NodemailerModules } from '../clients/nodemailer/nodemailer.module';
import { RepositoriesModule } from '../services/repositories.module';
import { UserRepositoryTyperom } from '../services/user.repository.typeorm';
import { UseCaseProxy } from './usecase-proxy';

@Module({
  imports: [RepositoriesModule, NodemailerModules],
})
export class UsecaseProxyModule {
  static CREATE_USER_USE_CASE = 'createUserUsecaseProxy';
  static LOGIN_USER_USE_CASE = 'loginUserUseCaseProxy';
  static GET_USER_PROFILE_USE_CASE = 'getUserProfileUseCaseProxy';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        {
          inject: [UserRepositoryTyperom, NodemailerClient],
          provide: UsecaseProxyModule.CREATE_USER_USE_CASE,
          useFactory: (
            userRepository: UserRepositoryTyperom,
            nodemailerClient: NodemailerClient,
          ) =>
            new UseCaseProxy(
              new CreateUserUseCase(userRepository, nodemailerClient),
            ),
        },
        {
          inject: [UserRepositoryTyperom],
          provide: UsecaseProxyModule.LOGIN_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryTyperom) =>
            new UseCaseProxy(new LoginUserUseCase(userRepository)),
        },
        {
          inject: [UserRepositoryTyperom],
          provide: UsecaseProxyModule.GET_USER_PROFILE_USE_CASE,
          useFactory: (userRepository: UserRepositoryTyperom) =>
            new UseCaseProxy(new GetUserProfileUseCase(userRepository)),
        },
      ],

      exports: [
        UsecaseProxyModule.CREATE_USER_USE_CASE,
        UsecaseProxyModule.LOGIN_USER_USE_CASE,
        UsecaseProxyModule.GET_USER_PROFILE_USE_CASE,
      ],
    };
  }
}
