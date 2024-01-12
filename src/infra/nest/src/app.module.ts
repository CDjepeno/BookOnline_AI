import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsecaseProxyModule } from './infras/usecase-proxy/usecase-proxy.module';
import { TypeOModule } from './infras/clients/typeorm/type-orm.module';
import { CreateUserUseCase } from './application/usecases/create.user.usecase';
import { UserControllerModule } from './infras/controllers/user/users.controller.module';
import { UsersController } from './infras/controllers/user/users.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    UsecaseProxyModule.register(),
    UserControllerModule,
    ConfigModule.forRoot(),
    TypeOModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client-react', 'dist'),
    }),
  ],
  controllers: [UsersController],
  providers: [CreateUserUseCase],
  exports: [CreateUserUseCase],
})
export class AppModule {}
