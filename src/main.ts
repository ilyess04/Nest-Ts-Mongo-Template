import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8000;

  const config = new DocumentBuilder()
    .setTitle('Nest-Ts-Mongo App Template')
    .setDescription('Nest.js template using TypeScript, MongoDB for building any web backend application')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentations', app, document);

  await app.listen(port, () => console.log('App is runing on port :', port));
}
bootstrap();
