import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { FirebaseService } from './firebase.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: async () => {
        const serviceAccount = JSON.parse(process.env.FIREBASE);
        return admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: process.env.DATABASE_FIREBASE_URL,
          storageBucket: process.env.STORAGE_BUCKET,
        });
      },
    },
    FirebaseService,
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}
