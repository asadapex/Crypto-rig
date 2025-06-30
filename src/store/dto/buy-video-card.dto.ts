import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsUUID, Min } from 'class-validator';

export class BuyVideoCardDto {
  @ApiProperty({ type: String, example: 'uuid' })
  @IsUUID()
  type: string;

  @ApiProperty({ type: Number, example: 1 })
  @IsInt()
  @Min(1)
  count: number;
}
