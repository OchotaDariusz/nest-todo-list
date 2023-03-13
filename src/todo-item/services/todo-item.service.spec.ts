import { Test, TestingModule } from '@nestjs/testing';
import { TodoItemService } from './todo-item.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodoItemEntity } from '../entities';
import repositoryMockFactory, {
  MockType,
} from '../../../mocks/repositoryMockFactory';
import { Repository } from 'typeorm';

describe('TodosService', () => {
  const DUMMY_TODO = {
    id: '8e6fffd7-9888-4d62-8d4c-8b4bbff12262',
    title: 'DO THAT',
  };
  let todosService: TodoItemService;
  let repositoryMock: MockType<Repository<TodoItemEntity>>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        TodoItemService,
        {
          provide: getRepositoryToken(TodoItemEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    todosService = app.get<TodoItemService>(TodoItemService);
    repositoryMock = app.get(getRepositoryToken(TodoItemEntity));
  });

  it('should return array of todos', () => {
    repositoryMock.find.mockReturnValue([DUMMY_TODO]);
    expect(todosService.getAllItems()).toEqual([DUMMY_TODO]);
    expect(repositoryMock.find).toBeCalled();
  });

  it('should return one todo-item', () => {
    repositoryMock.findOneBy.mockReturnValue(DUMMY_TODO);
    expect(todosService.getItemById(DUMMY_TODO.id)).toEqual(DUMMY_TODO);
    expect(repositoryMock.findOneBy).toHaveBeenCalledWith({
      id: DUMMY_TODO.id,
    });
  });
});
