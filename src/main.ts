import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

// Load environment variables
dotenv.config();

// Set the port, with a fallback to 3000
const PORT = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with a wildcard origin
  const corsOptions: CorsOptions = {
    origin: '*', 
  };
  app.enableCors(corsOptions);

  // Set a global prefix for all routes
  app.setGlobalPrefix('api/v1');  

  // Configure Swagger for API documentation
  const config = new DocumentBuilder()
    .setTitle('Task Generator')
    .setDescription('API Documentation for Task Generator')
    .setVersion('1.0')
    .addBearerAuth() 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  // Start the application and log the URL
  await app.listen(PORT,'0.0.0.0');
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log(`API documentation is available at http://localhost:${PORT}/api/v1/docs`);
}

bootstrap();
