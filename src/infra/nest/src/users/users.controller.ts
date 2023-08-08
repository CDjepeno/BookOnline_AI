import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from '../core/dtos/user.dtos';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async createUser(@Body() userDto: UserDTO) {
    return this.userService.createUser(userDto);
  }
}
