import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TodosRepository } from './repositories/todos.repository';

@Module({
  imports: [],
  controllers: [TodosController],
  providers: [TodosService, TodosRepository],
})
export class TodosModule {}
