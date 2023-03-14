import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TodoItemDto {
  @ApiProperty({
    description: 'The Todo title',
    minimum: 3,
    default: '',
  })
  @IsNotEmpty()
  @MinLength(3)
  title: string;
}
