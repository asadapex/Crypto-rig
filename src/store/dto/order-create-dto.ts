import { IsUUID } from "class-validator";
import { BuyVideoCardsDto } from "./buy-video-card.dto";
import { ApiProperty } from "@nestjs/swagger";

export class OrderCreateDto extends BuyVideoCardsDto {
    @ApiProperty({ type: String, example: 'uuid' })
    @IsUUID()
    userId: string;
}