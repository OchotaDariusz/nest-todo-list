import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
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

  @Get('/:uuid')
  getItem(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.todosService.getItemById(uuid);
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  postNewItem(@Body() itemDto: TodoItemDto) {
    return this.todosService.addNewItem(itemDto);
  }

  @Patch('/:uuid')
  @HttpCode(200)
  patchItem(
    @Param('uuid', new ParseUUIDPipe()) uuid: string,
    @Body() partialItem: TodoItemDto,
  ) {
    return this.todosService.updateItem(uuid, partialItem);
  }

  @Delete('/:uuid')
  @HttpCode(204)
  deleteItem(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.todosService.deleteItem(uuid);
  }
}
