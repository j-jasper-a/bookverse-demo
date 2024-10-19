import { Controller, Get } from '@nestjs/common';
import { MigrateService } from './migrate.service';

@Controller('migrate')
export class MigrateController {
  constructor(private readonly migrateService: MigrateService) {}

  @Get('health')
  async healthCheck() {
    return Promise.resolve('This endpoint is for migration purposes only.');
  }
}
