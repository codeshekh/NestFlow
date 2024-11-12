import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  
  dotenv.config();


  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    origin: '*', 
  };
  app.enableCors(corsOptions);

  app.setGlobalPrefix('api/v1');  


  const config = new DocumentBuilder()
    .setTitle('Task Generator')
    .setDescription('API Documentation for Task Generator')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('api/v1/docs', app, document);  


  await app.listen(5000);
  console.log(`Application is running on: ${await app.getUrl()}/api/v1/docs`); 
}

bootstrap();
