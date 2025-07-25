import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class WithdrawDto {
  @ApiProperty({ type: Number, example: 100 })
  @IsNumber()
  amount: number;

  @ApiProperty({ enum: PaymentMethod, example: PaymentMethod.MASTERCARD })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({
    enum: String,
    example: 'card number or crypto wallet address',
  })
  @IsString()
  cardNumber: string;
}
