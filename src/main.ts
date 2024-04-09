import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  )
  const config = new DocumentBuilder()
    .setTitle('Chat api')
    .setDescription('Chat api docs')
    .setVersion('1.0')
    .addTag('Chat')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('/api/docs', app, document)

  const port = process.env.PORT || 3000
  await app.listen(port, () => console.log(`Server started on ${port}`));
}
bootstrap();
