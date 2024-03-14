import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/infras/common/guards/jwt-auth.guard';
import { UsecaseProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { BookController } from './book/book.controller';
import { AuthController } from './user/auth.controller';
import { UsersController } from './user/users.controller';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [BookController, UsersController, AuthController],
  providers: [JwtAuthGuard, JwtService],
})
export class ControllerModule {}
