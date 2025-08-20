import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive, IsUUID } from 'class-validator';

export class CalculateInvestmentDto {
  @ApiProperty({ example: 1 })
  @IsUUID()
  videoCardId: string;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  @IsPositive()
  investment: number;
}
