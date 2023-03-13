import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TodoItemEntity } from './typeorm';
import repositoryMockFactory, {
  MockType,
} from '../../mocks/repositoryMockFactory';
import { Repository } from 'typeorm';

describe('TodosService', () => {
  const DUMMY_TODO = {
    id: '8e6fffd7-9888-4d62-8d4c-8b4bbff12262',
    title: 'DO THAT',
  };
  let todosService: TodosService;
  let repositoryMock: MockType<Repository<TodoItemEntity>>;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(TodoItemEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    todosService = app.get<TodosService>(TodosService);
    repositoryMock = app.get(getRepositoryToken(TodoItemEntity));
  });

  it('should return array of todos', () => {
    repositoryMock.find.mockReturnValue([DUMMY_TODO]);
    expect(todosService.getAllItems()).toEqual([DUMMY_TODO]);
    expect(repositoryMock.find).toBeCalled();
  });

  it('should return one TodoItem', () => {
    repositoryMock.findOneBy.mockReturnValue(DUMMY_TODO);
    expect(todosService.getItemById(DUMMY_TODO.id)).toEqual(DUMMY_TODO);
    expect(repositoryMock.findOneBy).toHaveBeenCalledWith({
      id: DUMMY_TODO.id,
    });
  });
});
