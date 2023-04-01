import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';

import entities from '../src/entities';
import { ProductModule } from '../src/products/product.module';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ envFilePath: '.env.development' }),
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
        ProductModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/v1/product (GET) - response 200 status', () => {
    return request(app.getHttpServer()).get('/api/v1/product').expect(200);
  });

  it('/api/v1/product (POST) add product - response 201 status', () => {
    return request(app.getHttpServer())
      .post('/api/v1/product')
      .send({ name: 'first' })
      .expect(201)
      .then((response) => {
        return request(app.getHttpServer()).delete(
          `/api/v1/product/${response.body.id}`,
        );
      })
      .catch((err) => console.log(`ERROR: ${err.message}`));
  });

  it('/api/v1/product (POST) add product - product is added', () => {
    return request(app.getHttpServer())
      .post('/api/v1/product')
      .send({ name: 'first' })
      .then((response) => {
        return request(app.getHttpServer())
          .get(`/api/v1/product/${response.body.id}`)
          .expect({ id: response.body.id, name: 'first' })
          .then(() => {
            return request(app.getHttpServer()).delete(
              `/api/v1/product/${response.body.id}`,
            );
          })
          .catch((err) => console.log(`ERROR: ${err.message}`));
      })
      .catch((err) => console.log(`ERROR: ${err.message}`));
  });

  it('/api/v1/product/:uuid (PATCH) update product - response 200 status', () => {
    return request(app.getHttpServer())
      .post('/api/v1/product')
      .send({ name: 'first' })
      .then((response) => {
        return request(app.getHttpServer())
          .patch(`/api/v1/product/${response.body.id}`)
          .send({ name: 'second' })
          .expect(200)
          .then(() => {
            return request(app.getHttpServer()).delete(
              `/api/v1/product/${response.body.id}`,
            );
          })
          .catch((err) => console.log(`ERROR: ${err.message}`));
      })
      .catch((err) => console.log(`ERROR: ${err.message}`));
  });

  it('/api/v1/product/:uuid (PATCH) update product - product is updated', () => {
    return request(app.getHttpServer())
      .post('/api/v1/product')
      .send({ name: 'first' })
      .then((response) => {
        return request(app.getHttpServer())
          .patch(`/api/v1/product/${response.body.id}`)
          .send({ name: 'second' })
          .then(() => {
            return request(app.getHttpServer())
              .get(`/api/v1/product/${response.body.id}`)
              .expect({ id: response.body.id, name: 'second' })
              .then(() => {
                return request(app.getHttpServer()).delete(
                  `/api/v1/product/${response.body.id}`,
                );
              })
              .catch((err) => console.log(`ERROR: ${err.message}`));
          })
          .catch((err) => console.log(`ERROR: ${err.message}`));
      })
      .catch((err) => console.log(`ERROR: ${err.message}`));
  });

  it('/api/v1/product/:uuid (DELETE) delete product - response 204 status', () => {
    return request(app.getHttpServer())
      .post('/api/v1/product')
      .send({ name: 'first' })
      .then((response) => {
        return request(app.getHttpServer())
          .delete(`/api/v1/product/${response.body.id}`)
          .expect(204);
      })
      .catch((err) => console.log(`ERROR: ${err.message}`));
  });
});
