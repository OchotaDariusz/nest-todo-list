import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TodoItem } from './interfaces/todoitem.interface';

describe('TodosController', () => {
  let todosController: TodosController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService],
    }).compile();

    todosController = app.get<TodosController>(TodosController);
  });

  describe('GET', () => {
    it('should return empty array', () => {
      todosController
        .getAllItems()
        .then((allItems: TodoItem[]) => expect(allItems).toStrictEqual([]));
    });
  });

  describe('POST', () => {
    it('should return one item', () => {
      todosController.postNewItem({ title: 'first' }).then(() => {
        todosController
          .getAllItems()
          .then((allItems: TodoItem[]) =>
            expect(allItems.length).toStrictEqual(1),
          );
      });
    });
  });

  describe('PATCH', () => {
    it('should return updated item', () => {
      todosController.postNewItem({ title: 'first' }).then(() => {
        todosController.patchItem(0, { title: 'second' }).then(() => {
          todosController
            .getItem(0)
            .then((item: TodoItem) =>
              expect(item.title).toStrictEqual('second'),
            );
        });
      });
    });
  });

  describe('DELETE', () => {
    it('should remove item', () => {
      todosController.postNewItem({ title: 'first' }).then(() => {
        todosController.deleteItem(0).then(() => {
          todosController
            .getAllItems()
            .then((allItems: TodoItem[]) => expect(allItems).toStrictEqual([]));
        });
      });
    });
  });
});
