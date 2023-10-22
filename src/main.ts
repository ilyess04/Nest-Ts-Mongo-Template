import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8000;

  const config = new DocumentBuilder()
    .setTitle('App Template')
    .setDescription('App Template Meta Description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentations', app, document);

  await app.listen(port, () => console.log('App is runing on port :', port));
}
bootstrap();
