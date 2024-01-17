import { DynamicModule, Module } from '@nestjs/common';

import { UseCaseProxy } from './usecase-proxy';
import { UserRepositoryTyperom } from '../services/user.repository.typeorm';
import { CreateUserUseCase } from 'src/application/usecases/create.user.usecase';
import { RepositoriesModule } from '../services/repositories.module';
import { NodemailerModules } from '../clients/nodemailer/nodemailer.module';
import NodemailerClient from '../clients/nodemailer/nodemailer.client';

@Module({
  imports: [RepositoriesModule, NodemailerModules],
})
export class UsecaseProxyModule {
  static CREATE_USER_USE_CASE = 'createUserUsecaseProxy';

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
      ],
      exports: [UsecaseProxyModule.CREATE_USER_USE_CASE],
    };
  }
}
