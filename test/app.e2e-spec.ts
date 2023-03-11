import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TodosModule } from '../src/Todos/todos.module';

describe('TodosController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TodosModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/v1/todos (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/todos')
      .expect(200)
      .expect([]);
  });

  it('/api/v1/todos (POST) add todo item', () => {
    return request(app.getHttpServer())
      .post('/api/v1/todos')
      .send({ id: '1', title: 'first' })
      .expect(201);
  });
});
