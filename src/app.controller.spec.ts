import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppRepository } from './app.repository';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, AppRepository],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return empty array', () => {
      expect(appController.getAllItems()).toStrictEqual([]);
    });
    it('should return one item', () => {
      appController.postNewItem({ id: '1', title: 'first' });
      expect(appController.getAllItems()).toStrictEqual([
        { id: '1', title: 'first' },
      ]);
    });
  });
});
