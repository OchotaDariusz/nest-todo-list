import { Module } from '@nestjs/common';
import { TodosModule } from './Todos/todos.module';

@Module({
  imports: [TodosModule],
})
export class AppModule {}
