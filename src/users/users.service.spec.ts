import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import {
  MockType,
  repositoryMockFactory,
} from '../../test/mocks/repository-mock-factory';

describe('UserService', () => {
  let service: UsersService;
  let repositoryMock: MockType<Repository<UserEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        // Provide your mock instead of the actual repository
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
    repositoryMock = module.get(getRepositoryToken(UserEntity));
  });

  it('should find a user by username', async () => {
    const user = { username: 'user' };
    repositoryMock.findOneBy.mockReturnValue(user);
    expect(await service.getUserByUsername(user.username)).toEqual(user);
    expect(repositoryMock.findOneBy).toBeCalledWith(user);
  });

  it('should find a user by id', async () => {
    const user = { id: '98c59dd7-3fcf-4cb1-bd25-bcbc082490a4' };
    repositoryMock.findOneBy.mockReturnValue(user);
    expect(await service.getUserById(user.id)).toEqual(user);
    expect(repositoryMock.findOneBy).toHaveBeenCalledWith(user);
  });

  it('should get all users', async () => {
    const users = [
      {
        id: '98c59dd7-3fcf-4cb1-bd25-bcbc082490a4',
        username: 'user',
        roles: ['user'],
      },
      {
        id: '98c59dd7-3fcf-4cb1-bd25-bcbc082490a4',
        username: 'user2',
        roles: ['user'],
      },
    ];
    repositoryMock.find.mockReturnValue(users);
    expect(await service.getAllUsers()).toEqual(users);
    expect(repositoryMock.find).toHaveBeenCalled();
  });

  it('should add new user', async () => {
    const users = [
      {
        id: '98c59dd7-3fcf-4cb1-bd25-bcbc082490a4',
        username: 'user',
        roles: ['user'],
      },
    ];
    const newUser = {
      username: 'user',
    };

    repositoryMock.find.mockReturnValue(users);
    repositoryMock.findOneBy.mockReturnValue(null);
    repositoryMock.save.mockReturnValue({
      id: '98c59dd7-3fcf-4cb1-bd25-bcbc082490a4',
      username: 'user',
      password: '$2b$10$mg7KG9fSZaHbOU0EZzSYk.I20qiYB/AAbSOtb37kODVTXWQVLEmCm',
      roles: ['user'],
    });
    expect(
      await service.addNewUser({
        ...newUser,
        password:
          '$2b$10$mg7KG9fSZaHbOU0EZzSYk.I20qiYB/AAbSOtb37kODVTXWQVLEmCm',
      }),
    ).toEqual(users[0]);
    expect(await service.getAllUsers()).toEqual(users);
    expect(repositoryMock.find).toHaveBeenCalled();
  });
});
