import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  PrismaHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: PrismaHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  checkapi() {
    return this.health.check([
      () => this.http.pingCheck('dokhub api', 'http://localhost:4000'),
    ]);
  }

  @Get()
  @HealthCheck()
  check() {}
}
