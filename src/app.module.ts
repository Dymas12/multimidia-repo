import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { FirebaseService } from './firebase/firebase.service';

@Module({
  imports: [FirebaseModule],
  controllers: [AppController],
  providers: [AppService,FirebaseService],
})
export class AppModule {}
