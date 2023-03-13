import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoItemEntity } from '../entities';
import { TodoItem } from '../interfaces/todo-item.interface';
import { TodoItemDto } from '../dto/todo-item.dto';

@Injectable()
export class TodoItemService {
  constructor(
    @InjectRepository(TodoItemEntity)
    private readonly todosRepository: Repository<TodoItem>,
  ) {}

  getAllItems(): Promise<TodoItem[]> {
    return this.todosRepository.find();
  }

  getItemById(id: string): Promise<TodoItem> {
    return this.todosRepository.findOneBy({ id });
  }

  async addNewItem(item: TodoItemDto): Promise<TodoItem> {
    return await this.todosRepository.save(item);
  }

  async updateItem(id: string, item: TodoItemDto): Promise<void> {
    await this.todosRepository.save({ id, title: item.title });
  }

  async deleteItem(id: string): Promise<void> {
    await this.todosRepository.delete(id);
  }
}
