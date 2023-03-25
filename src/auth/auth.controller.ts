import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserDto } from '../users/dto/user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @UsePipes(ValidationPipe)
  async register(@Body() user: UserDto) {
    return this.authService.register(user);
  }

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @UsePipes(ValidationPipe)
  async login(@Body() user: UserDto) {
    return this.authService.login(user);
  }

  @Get('/current')
  @UseGuards(JwtAuthGuard)
  getCurrentUser(@Request() req) {
    return req.user;
  }
}
