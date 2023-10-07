import * as bcrypt from 'bcrypt';
import {
  Body,
  Controller,
  Inject,
  Post,
  UseFilters,
} from '@nestjs/common';
import { CreateUserDto } from '../../../domaine/model/user.dtos';
import { UseCaseProxy } from '../../../infras/usecase-proxy/usecase-proxy';
import { UsecaseProxyModule } from '../../../infras/usecase-proxy/usecase-proxy.module';
import { CreateUserUseCase } from '../../../application/usecases/create.user.usecase';
import { BookErrorFilter } from '../../../infras/filters/book-error.filter';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsecaseProxyModule.CREATE_USER_USE_CASE)
    private readonly createUserUsecaseProxy: UseCaseProxy<CreateUserUseCase>,
  ) {}

  @Post()
  @UseFilters(BookErrorFilter)
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const { email, name, password, phone } = createUserDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await this.createUserUsecaseProxy.getInstance().execute({
        email: email,
        name: name,
        password: hashedPassword,
        phone: phone,
      });
      return {
        status: 'Created',
        code: 201,
        message: 'Insert data success',
        data: result,
      };
    } catch(err) {
      throw err
    }
  }
}
