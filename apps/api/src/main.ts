import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import {
  BadRequestException,
  Logger,
  RequestMethod,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import type { INestApplication } from '@nestjs/common';
import type { ValidationError } from '@nestjs/common';
import { loggerConfig } from '@/config/logging';
import * as fs from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerConfig()),
  });

  const logger = new Logger('app');

  const port = process.env.PORT || 4231;

  try {
    app.enableShutdownHooks();
    app.enableVersioning({
      type: VersioningType.URI,
      prefix: 'v',
      defaultVersion: '1',
    });

    app.use(helmet());

    app.enableCors({
      origin: '*',
      methods: ['GET', 'PATCH', 'DELETE', 'HEAD', 'POST', 'PUT', 'OPTIONS'],
      allowedHeaders: ['Accept', 'Authorization', 'Content-Type', 'Origin'],
      maxAge: 86_400,
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        validationError: {
          target: true,
          value: true,
        },
        exceptionFactory(errors: ValidationError[]) {
          return new BadRequestException({ errors });
        },
      }),
    );

    app.setGlobalPrefix('api', {
      exclude: [{ path: 'health', method: RequestMethod.GET }],
    });

    generateSwagger(app);
    await app.listen(port);
    logger.log(
      `Application is running on: ${await app.getUrl()} port: ${port}`,
    );
  } catch (e) {
    logger.error(`Failed to start application on port: ${port}`, e);
  }
}

async function generateSwagger(app: INestApplication) {
  const logger = new Logger('App');
  logger.log(`Generating Swagger documentation...\n`);

  const config = new DocumentBuilder()
    .setTitle('Dokhub.co API')
    .setVersion('v1')
    .setDescription('Dokhub.co API')
    .setTermsOfService('https://dokhub.co/terms')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const outputFile = './swagger/documentation.json';

  if (fs.existsSync(outputFile)) {
    fs.unlinkSync(outputFile);
  }

  fs.writeFileSync(outputFile, JSON.stringify(document, null, 2), {
    encoding: 'utf8',
  });
  SwaggerModule.setup('docs', app, document);

  logger.log(`Swagger documentation available in the "/docs" endpoint\n`);
}

bootstrap();
