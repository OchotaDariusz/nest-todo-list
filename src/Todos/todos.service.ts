import { Injectable } from '@nestjs/common';
import { TodosRepository } from './repositories/todos.repository';
import { TodoItem } from './interfaces/todos.interface';

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

  replaceItem(index: number, item: TodoItem): void {
    this.todosRepository.replaceItem(index, item);
  }

  updateItem(index: number, title: Partial<TodoItem>): void {
    this.todosRepository.updateItem(index, title);
  }

  deleteItem(index: number): void {
    this.todosRepository.deleteItem(index);
  }
}
