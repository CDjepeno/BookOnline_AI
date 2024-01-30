import { Module } from '@nestjs/common';
import { UsecaseProxyModule } from '../../../infras/usecase-proxy/usecase-proxy.module';
import { AuthController } from './auth.controller';
import { UsersController } from './users.controller';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/infras/common/guards/jwt-auth.guard';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [UsersController, AuthController],
  providers: [JwtAuthGuard, JwtService],
})
export class UserControllerModule {}
