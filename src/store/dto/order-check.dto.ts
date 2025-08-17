import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class OrderCheckDto {
  @ApiProperty({ enum: OrderStatus, example: OrderStatus.ACCEPTED })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiPropertyOptional({
    type: String,
    example: 'Your request was rejected due to policy violation.',
  })
  @ValidateIf((o) => o.status === OrderStatus.REJECTED)
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty({ type: Boolean, example: true })
  @IsBoolean()
  read: boolean;
}
