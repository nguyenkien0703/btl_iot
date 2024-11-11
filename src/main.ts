import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });



  const configSwagger = new DocumentBuilder()
    .setTitle('IOT')
    .setDescription("list api for simple iot application by Kien Hoang dev")
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('video')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, document);

  const port = config.get('api.port');
  const server = await app.listen(port);
 
  app.useWebSocketAdapter(server);

}
bootstrap();