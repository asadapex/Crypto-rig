import { Module } from '@nestjs/common';
import { VideocardService } from './videocard.service';
import { VideocardController } from './videocard.controller';

@Module({
  controllers: [VideocardController],
  providers: [VideocardService],
})
export class VideocardModule {}
