import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsecaseProxyModule } from '../../../infras/usecase-proxy/usecase-proxy.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [UsersController, AuthController],
})
export class UserControllerModule {}
