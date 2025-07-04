import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class WithdrawDto {
  @ApiProperty({ type: Number, example: 100 })
  @IsNumber()
  amount: number;
}
