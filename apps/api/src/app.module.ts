import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { AppController } from './app.controller';
import { AppLoggerMiddleware } from './applogger.middleware';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [
    HealthModule,
    PrismaModule,
    AuthModule,
    UserModule,
    OrganizationModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
