import { Module } from '@nestjs/common';
import { MigrateService } from './migrate.service';
import { MigrateController } from './migrate.controller';
import { FirebaseAdminModule } from '../firebase-admin/firebase-admin.module';

@Module({
  imports: [FirebaseAdminModule],
  providers: [MigrateService],
  controllers: [MigrateController],
})
export class MigrateModule {}
