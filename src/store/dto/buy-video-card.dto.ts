import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsUUID, Min } from 'class-validator';

export class BuyVideoCardDto {
  @ApiProperty({ type: String, example: 'uuid' })
  @IsUUID()
  videoCardId: string;

  @ApiProperty({ type: Number, example: 1 })
  @IsInt()
  @Min(1)
  count: number;
}
