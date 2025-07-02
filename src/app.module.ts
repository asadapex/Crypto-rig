import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { StoreModule } from './store/store.module';
// import { MiningModule } from './mining/mining.module';
import { ScheduleModule } from '@nestjs/schedule';
import { VideocardModule } from './videocard/videocard.module';
import { UsersModule } from './users/users.module';
import { MulterModule } from './multer/multer.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    StoreModule,
    // MiningModule,
    ScheduleModule.forRoot(),
    VideocardModule,
    UsersModule,
    MulterModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
