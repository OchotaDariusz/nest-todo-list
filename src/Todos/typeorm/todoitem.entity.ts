import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TodoItem } from '../interfaces/todoitem.interface';

@Entity({ name: 'todo_items' })
export class TodoItemEntity implements TodoItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    default: '',
  })
  title: string;
}