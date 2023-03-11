import { Injectable } from '@nestjs/common';
import { TodoItem } from './types';

@Injectable()
export class TodosRepository {
  private readonly data: TodoItem[];

  constructor() {
    this.data = [];
  }

  public getAllData(): TodoItem[] {
    return this.data;
  }

  public getItem(index: number): TodoItem {
    return this.data[index];
  }

  public getFirstItem(): TodoItem {
    return this.data[0];
  }

  public getLastItem(): TodoItem {
    return this.data[this.data.length - 1];
  }

  public addItem(item: TodoItem): void {
    this.data.push(item);
  }
}
