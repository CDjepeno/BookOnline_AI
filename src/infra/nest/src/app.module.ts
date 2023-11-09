import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsecaseProxyModule } from './infras/usecase-proxy/usecase-proxy.module';
import { TypeOModule } from './infras/clients/typeorm/type-orm.module';
import { CreateUserUseCase } from './application/usecases/create.user.usecase';
import { UserControllerModule } from './infras/controllers/user/users.controller.module';
import { UsersController } from './infras/controllers/user/users.controller';

@Module({
  imports: [
    UsecaseProxyModule.register(),
    UserControllerModule,
    ConfigModule.forRoot(),
    TypeOModule,
  ],
  controllers: [UsersController],
  providers: [CreateUserUseCase],
  exports: [CreateUserUseCase],
})
export class AppModule {}
