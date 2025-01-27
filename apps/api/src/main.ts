import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Mockp | Matheus Depolito')
    .setDescription(
      `Mockp Api
    vá para <a href="/graphql" target="_blank">/graphql</a>.
    ou, <a target="_blank" href="https://studio.apollographql.com/sandbox/explorer">Apollo explorer</a>
    `,
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/', app, document);

  await app.listen(3000);
}
bootstrap();
