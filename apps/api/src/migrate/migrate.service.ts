import { Injectable } from '@nestjs/common';
import { FirebaseAdminService } from '../firebase-admin/firebase-admin.service';

@Injectable()
export class MigrateService {
  constructor(private readonly firebase: FirebaseAdminService) {}
}
