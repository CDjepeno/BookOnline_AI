import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AddBookUseCase } from './application/usecases/book/AddBook/addBook.usecase';
import { AddUserUseCase } from './application/usecases/user/adduser/add.user.usecase';
import { TypeOModule } from './infras/clients/typeorm/type-orm.module';
import { ControllerModule } from './infras/controllers/controller.module';
import { UsersController } from './infras/controllers/user/users.controller';
import { UsecaseProxyModule } from './infras/usecase-proxy/usecase-proxy.module';

@Module({
  imports: [
    UsecaseProxyModule.register(),
    ControllerModule,
    ConfigModule.forRoot(),
    TypeOModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'client-react', 'dist'),
    }),
  ],
  controllers: [UsersController],
  providers: [AddUserUseCase, AddBookUseCase],
  exports: [AddUserUseCase, AddBookUseCase],
})
export class AppModule {}
