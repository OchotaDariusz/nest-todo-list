import { Injectable } from '@nestjs/common';
import { AppRepository } from './app.repository';
import { TodoItem } from './types';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}
  getAllItems(): TodoItem[] {
    return this.appRepository.getAllData();
  }
  getItemAtIndex(index: number): TodoItem {
    return this.appRepository.getItem(index);
  }
  getFirstItem(): TodoItem {
    return this.appRepository.getFirstItem();
  }
  getLastItem(): TodoItem {
    return this.appRepository.getLastItem();
  }
  addNewItem(item: TodoItem): void {
    this.appRepository.addItem(item);
  }
}
