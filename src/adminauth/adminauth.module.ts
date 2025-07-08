import { Module } from '@nestjs/common';
import { AdminauthService } from './adminauth.service';
import { AdminauthController } from './adminauth.controller';

@Module({
  controllers: [AdminauthController],
  providers: [AdminauthService],
})
export class AdminauthModule {}
