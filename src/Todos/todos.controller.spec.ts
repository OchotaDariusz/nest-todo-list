import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TodosRepository } from './todos.repository';

describe('TodosController', () => {
  let todosController: TodosController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService, TodosRepository],
    }).compile();

    todosController = app.get<TodosController>(TodosController);
  });

  describe('root', () => {
    it('should return empty array', () => {
      expect(todosController.getAllItems()).toStrictEqual([]);
    });
    it('should return one item', () => {
      todosController.postNewItem({ id: '1', title: 'first' });
      expect(todosController.getAllItems()).toStrictEqual([
        { id: '1', title: 'first' },
      ]);
    });
  });
});
