import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";

export class CreateNotificationDto {
    @ApiProperty({ example: "Notification title" })
    @IsString()
    title: string;
    @ApiProperty({ example: "Notification description" })
    @IsString()
    description: string;
    @ApiProperty({ example: "Notification user id", required: false })
    @IsUUID()
    @IsOptional()
    userId?: string;
}
