import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItemEntity } from './entities';
import { TodosController } from './controllers/todos.controller';
import { TodosService } from './services/todos.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoItemEntity])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
