import { ApiProperty } from '@nestjs/swagger';
import { WithdrawStatus } from '@prisma/client';
import { IsEnum, IsUUID } from 'class-validator';

export class WithdrawReq {
  @ApiProperty({ type: String, example: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ enum: WithdrawStatus, example: WithdrawStatus.PENDING })
  @IsEnum(WithdrawStatus)
  status: WithdrawStatus;
}
