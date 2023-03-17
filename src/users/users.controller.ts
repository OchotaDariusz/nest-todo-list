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
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@Controller('/api/v1/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:uuid')
  getUser(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.userService.getUserById(uuid);
  }

  @Post()
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
  @HttpCode(204)
  deleteUser(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.userService.deleteUser(uuid);
  }
}
