import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { repositoryMockFactory } from '../../test/mocks/repository-mock-factory';
import { ProductEntity } from './entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let productController: ProductController;

  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(ProductEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    productController = userModule.get<ProductController>(ProductController);
  });

  it('should be defined', async () => {
    expect(productController).toBeDefined();
  });
});
