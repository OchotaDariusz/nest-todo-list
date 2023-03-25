import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap(): Promise<{ port: number; hostname: string }> {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Products')
    .setDescription('REST API')
    .setVersion('1.0')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  const port = Number(process.env.PORT) || 3000;
  const hostname = process.env.HOSTNAME || 'localhost';

  await app.listen(port, hostname);
  return { port, hostname };
}

bootstrap()
  .then(({ port, hostname }) =>
    console.info(`Server is running at ${hostname}:${port}`),
  )
  .catch((err) => console.error(err.message));
