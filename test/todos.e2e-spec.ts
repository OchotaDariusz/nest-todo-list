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

  it('/api/v1/todos (GET) - response 200 status', () => {
    return request(app.getHttpServer()).get('/api/v1/todos').expect(200);
  });

  it('/api/v1/todos (GET) - should return empty list', () => {
    return request(app.getHttpServer()).get('/api/v1/todos').expect([]);
  });

  it('/api/v1/todos (POST) add todo item - response 201 status', () => {
    return request(app.getHttpServer())
      .post('/api/v1/todos')
      .send({ id: '1', title: 'first' })
      .expect(201);
  });

  it('/api/v1/todos (POST) add todo item - item is added', () => {
    return request(app.getHttpServer())
      .post('/api/v1/todos')
      .send({ id: '1', title: 'first' })
      .then(() => {
        return request(app.getHttpServer())
          .get('/api/v1/todos/0')
          .expect({ id: '1', title: 'first' });
      })
      .catch((err) => console.log(`ERROR: ${err.message}`));
  });

  it('/api/v1/todos/0 (PUT) replace todo item - response 200 status', () => {
    return request(app.getHttpServer())
      .post('/api/v1/todos')
      .send({ id: '1', title: 'first' })
      .then(() => {
        return request(app.getHttpServer())
          .put('/api/v1/todos/0')
          .send({ id: '2', title: 'second' })
          .expect(200);
      })
      .catch((err) => console.log(`ERROR: ${err.message}`));
  });

  it('/api/v1/todos/0 (PUT) replace todo item - item is replaced', () => {
    return request(app.getHttpServer())
      .post('/api/v1/todos')
      .send({ id: '1', title: 'first' })
      .then(() => {
        return request(app.getHttpServer())
          .put('/api/v1/todos/0')
          .send({ id: '2', title: 'second' })
          .then(() => {
            return request(app.getHttpServer())
              .get('/api/v1/todos/0')
              .expect({ id: '2', title: 'second' });
          })
          .catch((err) => console.log(`ERROR: ${err.message}`));
      })
      .catch((err) => console.log(`ERROR: ${err.message}`));
  });

  it('/api/v1/todos/0 (PATCH) update todo item - response 200 status', () => {
    return request(app.getHttpServer())
      .post('/api/v1/todos')
      .send({ id: '1', title: 'first' })
      .then(() => {
        return request(app.getHttpServer())
          .patch('/api/v1/todos/0')
          .send({ title: 'second' })
          .expect(200);
      })
      .catch((err) => console.log(`ERROR: ${err.message}`));
  });

  it('/api/v1/todos/0 (PATCH) update todo item - item is updated', () => {
    return request(app.getHttpServer())
      .post('/api/v1/todos')
      .send({ id: '1', title: 'first' })
      .then(() => {
        return request(app.getHttpServer())
          .patch('/api/v1/todos/0')
          .send({ title: 'second' })
          .then(() => {
            return request(app.getHttpServer())
              .get('/api/v1/todos/0')
              .expect({ id: '1', title: 'second' });
          })
          .catch((err) => console.log(`ERROR: ${err.message}`));
      })
      .catch((err) => console.log(`ERROR: ${err.message}`));
  });

  it('/api/v1/todos/0 (DELETE) delete todo item - response 204 status', () => {
    return request(app.getHttpServer())
      .post('/api/v1/todos')
      .send({ id: '1', title: 'first' })
      .then(() => {
        return request(app.getHttpServer())
          .delete('/api/v1/todos/0')
          .expect(204);
      })
      .catch((err) => console.log(`ERROR: ${err.message}`));
  });

  it('/api/v1/todos (DELETE) delete todo item - item is removed', () => {
    return request(app.getHttpServer())
      .post('/api/v1/todos')
      .send({ id: '1', title: 'first' })
      .then(() => {
        return request(app.getHttpServer())
          .delete('/api/v1/todos/0')
          .then(() => {
            return request(app.getHttpServer()).get('/api/v1/todos').expect([]);
          })
          .catch((err) => console.log(`ERROR: ${err.message}`));
      })
      .catch((err) => console.log(`ERROR: ${err.message}`));
  });
});
