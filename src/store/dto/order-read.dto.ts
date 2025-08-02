import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsUUID } from 'class-validator';

export class OrderReadDto {
  @ApiProperty({ type: Boolean, example: true })
  @IsBoolean()
  read: boolean;
}
