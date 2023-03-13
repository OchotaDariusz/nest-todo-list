import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getItemById(id: string): Promise<TodoItem> {
    const todoItem = await this.todosRepository.findOneBy({ id });
    if (!todoItem) {
      throw new NotFoundException("Can't find that item.");
    }
    return todoItem;
  }

  async addNewItem(item: TodoItemDto): Promise<TodoItem> {
    return await this.todosRepository.save(item);
  }

  async updateItem(id: string, item: TodoItemDto): Promise<TodoItem> {
    const todoItem = await this.todosRepository.findOneBy({ id });
    if (!todoItem) {
      throw new NotFoundException("Can't find item to update.");
    }
    todoItem.title = item.title;
    return await this.todosRepository.save(todoItem);
  }

  async deleteItem(id: string): Promise<void> {
    const todoItem = await this.todosRepository.findOneBy({ id });
    if (!todoItem) {
      throw new NotFoundException("Can't find item to delete.");
    }
    await this.todosRepository.delete(id);
  }
}
