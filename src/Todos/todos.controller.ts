import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoItem } from './types';

@Controller('/api/v1')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get('/todos')
  getAllItems(
    @Query('onlyFirst') onlyFirst?: boolean,
    @Query('onlyLast') onlyLast?: boolean,
  ): TodoItem[] | TodoItem {
    if (onlyFirst) return this.todosService.getFirstItem();
    if (onlyLast) return this.todosService.getLastItem();
    return this.todosService.getAllItems();
  }

  @Get('/todos/:index')
  getItem(@Param() params): TodoItem {
    return this.todosService.getItemAtIndex(params.index);
  }

  @Post('/todos')
  @HttpCode(201)
  postNewItem(@Body() itemDto: TodoItem): void {
    this.todosService.addNewItem(itemDto);
  }
}
