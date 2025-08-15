import { ApiProperty } from "@nestjs/swagger";
import { NotificationType } from "@prisma/client";
import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";

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
    @ApiProperty({example: false})
    @IsBoolean()
    read: boolean;
}
