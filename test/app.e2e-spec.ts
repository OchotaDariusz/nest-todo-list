import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/v1/items (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/v1/items')
      .expect(200)
      .expect([]);
  });

  it('/api/v1/items (POST) add todo item', () => {
    return request(app.getHttpServer())
      .post('/api/v1/items')
      .send({ id: '1', title: 'first' })
      .expect(201);
  });
});
