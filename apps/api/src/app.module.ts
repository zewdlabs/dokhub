import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from './config/env-validation';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   validationSchema: envValidationSchema,
    // }),
    HealthModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
