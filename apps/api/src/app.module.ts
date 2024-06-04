import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppLoggerMiddleware } from '@/middlewares/applogger.middleware';
import { OrganizationModule } from '@/modules/organization/organization.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from '@/modules/health/health.module';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/users/user.module';
import { PostsModule } from '@/modules/posts/posts.module';
import { MinioModule } from '@/modules/minio/minio.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    HealthModule,
    PrismaModule,
    AuthModule,
    UserModule,
    OrganizationModule,
    PostsModule,
    MinioModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
