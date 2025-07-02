import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsEnum, IsUUID } from 'class-validator';

export class VdcardStatusDto {
  @ApiProperty({ type: String, example: 'uuid' })
  @IsUUID()
  id: string;

  @ApiProperty({ enum: Status, example: Status.OFFLINE })
  @IsEnum(Status)
  status: Status;
}
