import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { TodoItem } from './types';

@Controller('/api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/items')
  getAllItems(
    @Query('onlyFirst') onlyFirst?: boolean,
    @Query('onlyLast') onlyLast?: boolean,
  ): TodoItem[] | TodoItem {
    if (onlyFirst) return this.appService.getFirstItem();
    if (onlyLast) return this.appService.getLastItem();
    return this.appService.getAllItems();
  }
  @Get('/items/:index')
  getItem(@Param() params): TodoItem {
    return this.appService.getItemAtIndex(params.index);
  }
  @Post('/items')
  @HttpCode(201)
  postNewItem(@Body() itemDto: TodoItem): void {
    this.appService.addNewItem(itemDto);
  }
}
