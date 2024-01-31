import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { GetUserProfileUseCase } from 'src/application/usecases/get.user.profile.usecase';
import { LoginUserUseCase } from 'src/application/usecases/login.user.usecase';
import { UseCaseProxy } from 'src/infras/usecase-proxy/usecase-proxy';
import { UsecaseProxyModule } from 'src/infras/usecase-proxy/usecase-proxy.module';
import { AuthDto } from '../../common/dto/auth.dto.class';
import { JwtAuthGuard } from 'src/infras/common/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UsecaseProxyModule.LOGIN_USER_USE_CASE)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUserUseCase>,

    @Inject(UsecaseProxyModule.GET_USER_PROFILE_USE_CASE)
    private readonly getUserProfileUseCaseProxy: UseCaseProxy<GetUserProfileUseCase>,
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

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() request) {
    return await this.getUserProfileUseCaseProxy
      .getInstance()
      .execute(request.user.email);
  }
}
