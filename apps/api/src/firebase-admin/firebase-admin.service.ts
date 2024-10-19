import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseAdminService implements OnModuleInit {
  db: admin.firestore.Firestore;
  auth: admin.auth.Auth;

  constructor(private readonly config: ConfigService) {}

  onModuleInit() {
    const { projectId, clientEmail, privateKey } =
      this.getFirebaseCredentials();

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    }

    this.db = admin.firestore();
    this.auth = admin.auth();
  }

  private getFirebaseCredentials() {
    const projectId = this.config.get<string>('FIREBASE_PROJECT_ID');
    const clientEmail = this.config.get<string>('FIREBASE_CLIENT_EMAIL');
    const rawKey = this.config.get<string>('FIREBASE_PRIVATE_KEY');
    const privateKey = rawKey?.replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error('Missing Firebase environment variables');
    }

    return { projectId, clientEmail, privateKey };
  }
}
