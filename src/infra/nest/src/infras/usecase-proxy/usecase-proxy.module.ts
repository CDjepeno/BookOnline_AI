import { DynamicModule, Module } from '@nestjs/common';

import { AddBookUseCase } from 'src/application/usecases/book/AddBook/add.book.usecase';
import { AddUserUseCase } from 'src/application/usecases/user/adduser/add.user.usecase';
import { GetCurrentUserUseCase } from 'src/application/usecases/user/getuser/get.current.user.usecase';
import { LoginUserUseCase } from 'src/application/usecases/user/getuser/login.user.usecase';
import NodemailerClient from '../clients/nodemailer/nodemailer.client';
import { NodemailerModules } from '../clients/nodemailer/nodemailer.module';
import { BookRepositoryTyperom } from '../services/book.repository.typeorm';
import { RepositoriesModule } from '../services/repositories.module';
import { UserRepositoryTyperom } from '../services/user.repository.typeorm';
import { UseCaseProxy } from './usecase-proxy';

@Module({
  imports: [RepositoriesModule, NodemailerModules],
})
export class UsecaseProxyModule {
  static CREATE_USER_USE_CASE = 'createUserUsecaseProxy';
  static LOGIN_USER_USE_CASE = 'loginUserUseCaseProxy';
  static GET_CURRENT_USER_USE_CASE = 'getCurrentUserUseCaseProxy';

  static ADD_BOOK_USECASES_PROXY = 'addTodoUsecasesProxy';

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
              new AddUserUseCase(userRepository, nodemailerClient),
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
          provide: UsecaseProxyModule.GET_CURRENT_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryTyperom) =>
            new UseCaseProxy(new GetCurrentUserUseCase(userRepository)),
        },
        {
          inject: [BookRepositoryTyperom],
          provide: UsecaseProxyModule.ADD_BOOK_USECASES_PROXY,
          useFactory: (bookRepository: BookRepositoryTyperom) =>
            new UseCaseProxy(new AddBookUseCase(bookRepository)),
        },
      ],

      exports: [
        UsecaseProxyModule.CREATE_USER_USE_CASE,
        UsecaseProxyModule.LOGIN_USER_USE_CASE,
        UsecaseProxyModule.GET_CURRENT_USER_USE_CASE,

        UsecaseProxyModule.ADD_BOOK_USECASES_PROXY,
      ],
    };
  }
}
