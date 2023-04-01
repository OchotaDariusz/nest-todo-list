import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { repositoryMockFactory } from '../../test/mocks/repository-mock-factory';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    userController = userModule.get<UserController>(UserController);
  });

  it('should be defined', async () => {
    expect(userController).toBeDefined();
  });
});
