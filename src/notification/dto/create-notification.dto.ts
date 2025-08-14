import { ApiProperty } from "@nestjs/swagger";
import { NotificationType } from "@prisma/client";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class CreateNotificationDto {
    @ApiProperty({ example: "Notification title" })
    @IsString()
    title: string;
    @ApiProperty({ example: "Notification description" })
    @IsString()
    description: string;
    @ApiProperty({ example: "Notification user id", required: false })
    @IsOptional()
    userId?: string;
    @ApiProperty({ example: NotificationType.INFO})
    @IsEnum(NotificationType)
    type: NotificationType;
}
