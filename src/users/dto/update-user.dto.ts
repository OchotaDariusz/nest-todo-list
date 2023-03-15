import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'User password update required fields',
    minimum: 8,
    default: 'password_here',
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
