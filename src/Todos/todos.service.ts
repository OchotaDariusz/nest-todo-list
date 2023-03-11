import { Injectable } from '@nestjs/common';
import { TodosRepository } from './todos.repository';
import { TodoItem } from './types';

@Injectable()
export class TodosService {
  constructor(private readonly todosRepository: TodosRepository) {}

  getAllItems(): TodoItem[] {
    return this.todosRepository.getAllData();
  }

  getItemAtIndex(index: number): TodoItem {
    return this.todosRepository.getItem(index);
  }

  getFirstItem(): TodoItem {
    return this.todosRepository.getFirstItem();
  }

  getLastItem(): TodoItem {
    return this.todosRepository.getLastItem();
  }

  addNewItem(item: TodoItem): void {
    this.todosRepository.addItem(item);
  }
}
