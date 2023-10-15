import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsecaseProxyModule } from '../../../infras/usecase-proxy/usecase-proxy.module';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [UsersController],
})
export class UserControllerModule {}
