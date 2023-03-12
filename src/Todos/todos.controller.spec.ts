import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TodosRepository } from './repositories/todos.repository';

describe('TodosController', () => {
  let todosController: TodosController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService, TodosRepository],
    }).compile();

    todosController = app.get<TodosController>(TodosController);
  });

  describe('GET', () => {
    it('should return empty array', () => {
      expect(todosController.getAllItems()).toStrictEqual([]);
    });
  });

  describe('POST', () => {
    it('should return one item', () => {
      todosController.postNewItem({ id: '1', title: 'first' });
      expect(todosController.getAllItems()).toStrictEqual([
        { id: '1', title: 'first' },
      ]);
    });
  });

  describe('PUT', () => {
    it('should return replaced item', () => {
      todosController.postNewItem({ id: '1', title: 'first' });
      todosController.putItem(0, { id: '2', title: 'second' });
      expect(todosController.getItem(0)).toStrictEqual({
        id: '2',
        title: 'second',
      });
    });
  });

  describe('PATCH', () => {
    it('should return updated item', () => {
      todosController.postNewItem({ id: '1', title: 'first' });
      console.log(todosController.getAllItems());
      todosController.patchItem(0, { title: 'second' });
      console.log(todosController.getAllItems());
      expect(todosController.getItem(0).title).toStrictEqual('second');
    });
  });

  describe('DELETE', () => {
    it('should remove item', () => {
      todosController.postNewItem({ id: '1', title: 'first' });
      todosController.deleteItem(0);
      expect(todosController.getAllItems()).toStrictEqual([]);
    });
  });
});
