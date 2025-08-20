import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    create(dto: CreateNotificationDto): Promise<{
        type: import(".prisma/client").$Enums.NotificationType;
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        userId: string | null;
        read: boolean;
    }>;
    findAll(): Promise<{
        type: import(".prisma/client").$Enums.NotificationType;
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        userId: string | null;
        read: boolean;
    }[]>;
    findOne(id: string): Promise<{
        type: import(".prisma/client").$Enums.NotificationType;
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        userId: string | null;
        read: boolean;
    }>;
    update(id: string, dto: UpdateNotificationDto): Promise<{
        type: import(".prisma/client").$Enums.NotificationType;
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        userId: string | null;
        read: boolean;
    }>;
    remove(id: string): Promise<{
        type: import(".prisma/client").$Enums.NotificationType;
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        userId: string | null;
        read: boolean;
    }>;
}
