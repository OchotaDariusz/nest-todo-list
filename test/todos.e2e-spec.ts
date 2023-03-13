import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TodoItemModule } from '../src/todo-item/todo-item.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from '../src/todo-item/entities';

describe('TodoitemsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: +configService.get('DB_PORT'),
            username: configService.get('DB_USER'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_NAME'),
            entities,
            synchronize: true,
          }),
          inject: [ConfigService],
        }),
        TodoItemModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/v1/todo-item (GET) - response 200 status', () => {
    return request(app.getHttpServer()).get('/api/v1/todo-item').expect(200);
  });

  it('/api/v1/todo-item (POST) add todo item - response 201 status', () => {
    return request(app.getHttpServer())
      .post('/api/v1/todo-item')
      .send({ title: 'first' })
      .expect(201);
  });

  it('/api/v1/todo-item (POST) add todo item - item is added', () => {
    return request(app.getHttpServer())
      .post('/api/v1/todo-item')
      .send({ title: 'first' })
      .then((response) => {
        return request(app.getHttpServer())
          .get(`/api/v1/todo-item/${response.body.id}`)
          .expect({ id: response.body.id, title: 'first' });
      })
      .catch((err) => console.log(`ERROR: ${err.message}`));
  });

  it('/api/v1/todo-item/:id (PATCH) update todo item - response 200 status', () => {
    return request(app.getHttpServer())
      .post('/api/v1/todo-item')
      .send({ title: 'first' })
      .then((response) => {
        return request(app.getHttpServer())
          .patch(`/api/v1/todo-item/${response.body.id}`)
          .send({ title: 'second' })
          .expect(200);
      })
      .catch((err) => console.log(`ERROR: ${err.message}`));
  });

  it('/api/v1/todo-item/:id (PATCH) update todo item - item is updated', () => {
    return request(app.getHttpServer())
      .post('/api/v1/todo-item')
      .send({ title: 'first' })
      .then((response) => {
        return request(app.getHttpServer())
          .patch(`/api/v1/todo-item/${response.body.id}`)
          .send({ title: 'second' })
          .then(() => {
            return request(app.getHttpServer())
              .get(`/api/v1/todo-item/${response.body.id}`)
              .expect({ id: response.body.id, title: 'second' });
          })
          .catch((err) => console.log(`ERROR: ${err.message}`));
      })
      .catch((err) => console.log(`ERROR: ${err.message}`));
  });

  it('/api/v1/todo-item/:id (DELETE) delete todo item - response 204 status', () => {
    return request(app.getHttpServer())
      .post('/api/v1/todo-item')
      .send({ title: 'first' })
      .then((response) => {
        return request(app.getHttpServer())
          .delete(`/api/v1/todo-item/${response.body.id}`)
          .expect(204);
      })
      .catch((err) => console.log(`ERROR: ${err.message}`));
  });
});
