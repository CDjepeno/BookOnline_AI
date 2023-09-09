import * as bcrypt from 'bcrypt';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/usecases/create.user.usecase';
import { CreateUserDto } from 'src/domaine/model/user.dtos';
import { UseCaseProxy } from 'src/infras/usecase-proxy/usecase-proxy';
import { UsecaseProxyModule } from 'src/infras/usecase-proxy/usecase-proxy.module';

@Controller('users')
export class UsersController {
  constructor(@Inject(UsecaseProxyModule.CREATE_USER_USE_CASE)
  private readonly createUserUsecaseProxy: UseCaseProxy<CreateUserUseCase>,) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await this.createUserUsecaseProxy.getInstance().execute({
      email: email,
      name: name,
      password: hashedPassword,
    });
    console.log(result);
    return {
      status: 'Created',
      code: 201,
      message: 'Insert data success',
      data: result,
    };
  }
}
