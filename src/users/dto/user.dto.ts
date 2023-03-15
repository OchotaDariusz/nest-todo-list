import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'User username',
    minimum: 4,
    default: 'user',
  })
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  @ApiProperty({
    description: 'Username password',
    minimum: 8,
    default: 'password_here',
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
