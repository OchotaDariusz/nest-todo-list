import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoItem } from './interfaces/todos.interface';

@Controller('/api/v1/todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  getAllItems(
    @Query('onlyFirst') onlyFirst?: boolean,
    @Query('onlyLast') onlyLast?: boolean,
  ): TodoItem[] | TodoItem {
    if (onlyFirst) return this.todosService.getFirstItem();
    if (onlyLast) return this.todosService.getLastItem();
    return this.todosService.getAllItems();
  }

  @Get('/:index')
  getItem(@Param() params): TodoItem {
    return this.todosService.getItemAtIndex(params.index);
  }

  @Post()
  @HttpCode(201)
  postNewItem(@Body() itemDto: TodoItem): void {
    this.todosService.addNewItem(itemDto);
  }

  @Put('/:index')
  @HttpCode(200)
  putItem(@Param() params, @Body() itemDto: TodoItem): void {
    this.todosService.replaceItem(params.index, itemDto);
  }

  @Patch('/:index')
  @HttpCode(200)
  patchItem(@Param() params, @Body() title: Partial<TodoItem>): void {
    this.todosService.updateItem(params.index, title);
  }

  @Delete('/:index')
  @HttpCode(204)
  deleteItem(@Param() params): void {
    this.todosService.deleteItem(params.index);
  }
}
