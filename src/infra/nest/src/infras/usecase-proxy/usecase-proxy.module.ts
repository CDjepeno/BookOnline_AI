import { DynamicModule, Module } from '@nestjs/common';

import { UseCaseProxy } from './usecase-proxy';
import { UserRepositoryTyperom } from '../services/user.repository.typeorm';
import { CreateUserUseCase } from 'src/application/usecases/create.user.usecase';
import { RepositoriesModule } from '../services/repositories.module';
import { TwilioClient } from '../clients/twilio/twilio.client';
import { TwilioModules } from '../clients/twilio/twilio.module';

@Module({
  imports: [RepositoriesModule, TwilioModules],
})
export class UsecaseProxyModule {
  static CREATE_USER_USE_CASE = 'createUserUsecaseProxy';

  static register(): DynamicModule {
    return {
      module: UsecaseProxyModule,
      providers: [
        {
          inject: [UserRepositoryTyperom, TwilioClient],
          provide: UsecaseProxyModule.CREATE_USER_USE_CASE,
          useFactory: (userRepository: UserRepositoryTyperom, twilioClient: TwilioClient) =>
            new UseCaseProxy(new CreateUserUseCase(userRepository, twilioClient)),
        },
      ],
      exports: [UsecaseProxyModule.CREATE_USER_USE_CASE],
    };
  }
}
