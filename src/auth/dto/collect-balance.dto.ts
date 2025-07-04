import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CollectUserBalanceDto {
  @ApiProperty({ type: String, example: 'uuid' })
  @IsUUID()
  id: string;
}
