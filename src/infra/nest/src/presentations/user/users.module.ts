import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsecaseProxyModule } from 'src/infras/usecase-proxy/usecase-proxy.module';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [UsersController],
})
export class UsersModule {}
