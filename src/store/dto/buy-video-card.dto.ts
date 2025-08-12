import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsUUID, Min, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class BuySingleVideoCardDto {
  @ApiProperty({ type: String, example: 'uuid' })
  @IsUUID()
  videoCardId: string;

  @ApiProperty({ type: Number, example: 1 })
  @IsInt()
  @Min(1)
  count: number;
}

export class BuyVideoCardsDto {
  @ApiProperty({ type: [BuySingleVideoCardDto], example: [
    { videoCardId: 'uuid1', count: 1 },
    { videoCardId: 'uuid2', count: 2 }
  ]})
  @ValidateNested({ each: true })
  @Type(() => BuySingleVideoCardDto)
  @ArrayMinSize(1)
  data: BuySingleVideoCardDto[];
}
