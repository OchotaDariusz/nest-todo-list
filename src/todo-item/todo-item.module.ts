import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItemEntity } from './entities';
import { TodoItemController } from './controllers/todo-item.controller';
import { TodoItemService } from './services/todo-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoItemEntity])],
  controllers: [TodoItemController],
  providers: [TodoItemService],
})
export class TodoItemModule {}
