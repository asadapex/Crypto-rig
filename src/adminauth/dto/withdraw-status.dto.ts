import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { WithdrawStatus } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';

export class WithdrawReq {
  @ApiProperty({ type: String, example: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ enum: WithdrawStatus, example: WithdrawStatus.PENDING })
  @IsEnum(WithdrawStatus)
  status: WithdrawStatus;

  @ApiPropertyOptional({
    type: String,
    example: 'Your request was rejected due to policy violation.',
  })
  @ValidateIf((o) => o.status === WithdrawStatus.REJECTED)
  @IsString()
  @IsNotEmpty()
  description?: string;
}
