import { IsNotEmpty, MinLength } from 'class-validator';

export class TodoItemDto {
  @IsNotEmpty()
  @MinLength(3)
  title: string;
}
