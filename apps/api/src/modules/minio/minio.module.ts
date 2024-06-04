import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MinioService } from './minio.service';

@Module({
  imports: [ConfigModule],
  providers: [MinioService],
  exports: [MinioService], // Export MinioService to make it available for dependency injection in other modules
})
export class MinioModule {}
