import { Module } from '@nestjs/common';
import { AdminauthService } from './adminauth.service';
import { AdminauthController } from './adminauth.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AdminauthController],
  providers: [AdminauthService],
})
export class AdminauthModule {}
