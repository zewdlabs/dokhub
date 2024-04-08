import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get('api')
  @HealthCheck()
  checkapi() {
    return this.health.check([
      () =>
        this.http.pingCheck(
          'dokhub api',
          'http://localhost:4231/api/auth/hello',
        ),
    ]);
  }

  // TODO: Make this work later
  // @Get('db')
  // @HealthCheck()
  // async checkdb() {
  //   return this.db.pingCheck('dokhub db', {
  //     $runCommandRaw: await this.prisma.$queryRaw`SELECT 1;`,
  //   });
  // }
}
