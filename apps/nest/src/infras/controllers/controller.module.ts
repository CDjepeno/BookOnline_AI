import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/infras/common/guards/jwt-auth.guard';
import { UsecaseProxyModule } from '../usecase-proxy/usecase-proxy.module';
import { AddBookController } from './book/addBook/addBook.controller';
import { GetAllBookController } from './book/getAllBook/getAllBook.controller';
import { AuthController } from './user/auth.controller';
import { UsersController } from './user/users.controller';

@Module({
  imports: [UsecaseProxyModule.register()],
  controllers: [
    UsersController,
    AuthController,
    AddBookController,
    GetAllBookController,
  ],
  providers: [JwtAuthGuard, JwtService],
})
export class ControllerModule {}
