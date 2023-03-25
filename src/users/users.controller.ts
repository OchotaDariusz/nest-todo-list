import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { Roles } from '../auth/roles/roles.decorator';
import { Role } from '../auth/roles/role.enum';
import { UserDto } from './dto/user.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UsersService } from './users.service';

@Controller('/api/v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:uuid')
  getUser(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.userService.getUserById(uuid);
  }

  @Post()
  @Roles(Role.ADMIN)
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  postNewUser(@Body() userDto: UserDto) {
    return this.userService.addNewUser(userDto);
  }

  @Patch('/:uuid')
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  patchUser(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() userDto: UserUpdateDto,
  ) {
    return this.userService.updateUser(uuid, userDto);
  }

  @Delete('/:uuid')
  @Roles(Role.ADMIN)
  @HttpCode(204)
  deleteUser(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.userService.deleteUser(uuid);
  }
}
