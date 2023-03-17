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
    default: '$2b$10$mg7KG9fSZaHbOU0EZzSYk.I20qiYB/AAbSOtb37kODVTXWQVLEmCm',
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
