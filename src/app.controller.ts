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

@Controller('/api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/items')
  getAllItems(
    @Query('onlyFirst') onlyFirst?: boolean,
    @Query('onlyLast') onlyLast?: boolean,
  ): string[] | string {
    if (onlyFirst) return this.appService.getFirstItem();
    if (onlyLast) return this.appService.getLastItem();
    return this.appService.getAllItems();
  }
  @Get('/items/:index')
  getItem(@Param() params): string {
    return this.appService.getItemAtIndex(params.index);
  }
  @Post('/items')
  @HttpCode(201)
  postNewItem(@Body() itemDto: string): void {
    this.appService.addNewItem(itemDto);
  }
}
