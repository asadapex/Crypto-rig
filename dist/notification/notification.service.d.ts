import { CreateNotificationDto } from './dto/create-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateNotificationDto } from './dto/update-notification.dto';
export declare class NotificationService {
    private prisma;
    constructor(prisma: PrismaService);
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
