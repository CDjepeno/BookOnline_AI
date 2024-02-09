import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/infras/entities/user.entity';
import { CreateUserUseCase } from '../../../application/usecases/create.user.usecase';
import { CreateUserDto } from '../../../domaine/model/user/user.dtos';
import { UseCaseProxy } from '../../../infras/usecase-proxy/usecase-proxy';
import { UsecaseProxyModule } from '../../../infras/usecase-proxy/usecase-proxy.module';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsecaseProxyModule.CREATE_USER_USE_CASE)
    private readonly createUserUsecaseProxy: UseCaseProxy<CreateUserUseCase>,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Creates a Post',
  })
  @ApiCreatedResponse({ description: 'User created.', type: User })
  async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.createUserUsecaseProxy
        .getInstance()
        .execute(createUserDto);
      return {
        status: 'Created',
        code: 201,
        message: 'Insert data success',
        data: result,
      };
    } catch (err) {
      throw err;
    }
  }
}
