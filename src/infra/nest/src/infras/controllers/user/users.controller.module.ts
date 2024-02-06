import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/infras/common/guards/jwt-auth.guard';
import { UsecaseProxyModule } from '../../../infras/usecase-proxy/usecase-proxy.module';
import { AuthController } from './auth.controller';
import { UsersController } from './users.controller';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [UsersController, AuthController],
  providers: [JwtAuthGuard, JwtService],
})
export class UserControllerModule {}
