import {
  Body,
  Controller,
  Inject,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UsecaseProxyModule } from 'src/infras/usecase-proxy/usecase-proxy.module';
import { UseCaseProxy } from 'src/infras/usecase-proxy/usecase-proxy';
import { LoginUserUseCase } from 'src/application/usecases/login.user.usecase';
import { AuthDto } from '../../common/dto/auth.dto.class';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UsecaseProxyModule.LOGIN_USER_USE_CASE)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUserUseCase>,
  ) {}

  @Post('login')
  async login(@Body() auth: AuthDto) {
    const user = await this.loginUsecaseProxy.getInstance().execute(auth);
    if (!user) {
      throw new UnauthorizedException(
        "L'utilisateur n'a pas pu être connecté.",
      );
    }
    return user;
  }
}
