import { IsUUID } from "class-validator";
import { BuyVideoCardDto } from "./buy-video-card.dto";
import { ApiProperty } from "@nestjs/swagger";

export class OrderCreateDto extends BuyVideoCardDto {
    @ApiProperty({ type: String, example: 'uuid' })
    @IsUUID()
    userId: string;
}