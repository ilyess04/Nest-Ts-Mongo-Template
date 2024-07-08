import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { rateLimit } from 'express-rate-limit';
import { ValidationPipe } from './common/pipes/validation.pipes';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8000;
  const helmet = require('helmet');
  const limiter = rateLimit({
    windowMs: 1 * 1000,
    max: 1000,
    message: 'too many request! slow down',
  });

  /* Swagger  */
  const config = new DocumentBuilder()
    .setTitle('Nest-Ts-Mongo App Template')
    .setDescription(
      'Nest.js template using TypeScript, MongoDB, Swagger for building any web backend application',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentations', app, document);

  /* Security */
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(limiter);

  await app.listen(port, () => console.log('App is runing on port :', port));
}
bootstrap();
