import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class TopupBalanceDto {
  @ApiProperty({ type: Number, example: 100 })
  @IsNumber()
  amount: number;

  @ApiProperty({ type: String, example: 'reciept' })
  @IsString()
  reciept: string;

  @ApiProperty({ enum: PaymentMethod, example: PaymentMethod.MASTERCARD })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}
