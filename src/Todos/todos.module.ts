import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoItemEntity } from './typeorm';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoItemEntity])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
