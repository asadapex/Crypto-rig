import { NotificationType } from "@prisma/client";
export declare class CreateNotificationDto {
    title: string;
    description: string;
    userId?: string;
    type: NotificationType;
    read: boolean;
}
