import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './utils/HttpException';
import { ResponseInterceptor } from './utils/ResponseInterceptor';
const rateLimit = require('express-rate-limit');
const requestIp = require('request-ip');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(
  new ClassSerializerInterceptor(app.get(Reflector)),
  new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.use(requestIp.mw());

  app.use(rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, 
    message: "Too many requests, please try again later.",
    keyGenerator: (req, res) => {
      return req.clientIp // IP address from requestIp.mw(), as opposed to req.ip
    }
  }));

  app.enableCors({
    allowedHeaders: '*',
    exposedHeaders: ['Content-Disposition'],
  });

  const config = new DocumentBuilder()
    .setTitle('AiDev Server')
    .setDescription('AiDev service for portal')
    .setVersion('1.0')
    .setExternalDoc('Download Postman Collection', '/swagger-json')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    }, 'access-token')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, swaggerDocument);

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    index: false,
    prefix: '/uploads',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
