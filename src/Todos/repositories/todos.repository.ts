import { Injectable } from '@nestjs/common';
import { TodoItem } from '../interfaces/todos.interface';

@Injectable()
export class TodosRepository {
  private readonly data: TodoItem[];

  constructor() {
    this.data = [];
  }

  getAllData(): TodoItem[] {
    return this.data;
  }

  getItem(index: number): TodoItem {
    return this.data[index];
  }

  getFirstItem(): TodoItem {
    return this.data[0];
  }

  getLastItem(): TodoItem {
    return this.data[this.data.length - 1];
  }

  addItem(item: TodoItem): void {
    this.data.push(item);
  }

  replaceItem(index: number, item: TodoItem): void {
    this.data[index] = item;
  }

  updateItem(index: number, partialItem: Partial<TodoItem>): void {
    this.data[index] = { ...this.data[index], ...partialItem };
  }

  deleteItem(index: number): void {
    this.data.splice(index, 1);
  }
}
