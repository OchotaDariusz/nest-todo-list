import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoItemService } from '../services/todo-item.service';
import { TodoItemDto } from '../dto/todo-item.dto';

@Controller('/api/v1/todo-item')
export class TodoItemController {
  constructor(private readonly todosService: TodoItemService) {}

  @Get()
  getAllItems() {
    return this.todosService.getAllItems();
  }

  @Get('/:id')
  getItem(@Param() params) {
    return this.todosService.getItemById(params.id);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  postNewItem(@Body() itemDto: TodoItemDto) {
    return this.todosService.addNewItem(itemDto);
  }

  @Patch('/:id')
  @HttpCode(200)
  patchItem(@Param() params, @Body() partialItem: TodoItemDto) {
    return this.todosService.updateItem(params.id, partialItem);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteItem(@Param() params) {
    return this.todosService.deleteItem(params.id);
  }
}
