import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserControllerModule } from './controllers/user/users.controller.module';
import { UsecaseProxyModule } from './infras/usecase-proxy/usecase-proxy.module';
import { UsersController } from './controllers/user/users.controller';
import { TypeOModule } from './infras/clients/typeorm/type-orm.module';

@Module({
  imports: [
    UsecaseProxyModule.register(),
    UserControllerModule,
    ConfigModule.forRoot(),

    TypeOModule
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
