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
import { TodosService } from '../services/todos.service';
import { TodoItemDto } from '../dto/todoitem.dto';

@Controller('/api/v1/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

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
