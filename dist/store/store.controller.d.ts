import { StoreService } from './store.service';
import { BuyVideoCardsDto } from './dto/buy-video-card.dto';
import { Request } from 'express';
import { OrderCheckDto } from './dto/order-check.dto';
import { OrderCreateDto } from './dto/order-create-dto';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    buy(req: Request, data: BuyVideoCardsDto): Promise<{
        data: {
            order: {
                description: string | null;
                id: string;
                status: import(".prisma/client").$Enums.OrderStatus;
                createdAt: Date;
                userId: string;
                read: boolean;
                orderType: import(".prisma/client").$Enums.OrderType | null;
                createdBy: string;
            };
            orderItems: import(".prisma/client").Prisma.BatchPayload;
        };
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
    orders(): Promise<{
        data: ({
            items: ({
                videoCard: {
                    id: string;
                    createdAt: Date;
                    image: string | null;
                    manufacturer: string;
                    model: string;
                    release: number;
                    algorithm: string;
                    hashRate: string;
                    powerEfficiency: string;
                    powerUsage: string;
                    supportedCoins: string;
                    network: string;
                    fans: number;
                    temperature: string;
                    noiseLevel: string;
                    weight: string;
                    price: number;
                };
            } & {
                id: string;
                videoCardId: string;
                orderId: string;
                count: number;
            })[];
            user: {
                email: string;
                id: string;
                role: import(".prisma/client").$Enums.UserRole;
            };
        } & {
            description: string | null;
            id: string;
            status: import(".prisma/client").$Enums.OrderStatus;
            createdAt: Date;
            userId: string;
            read: boolean;
            orderType: import(".prisma/client").$Enums.OrderType | null;
            createdBy: string;
        })[];
        messages: never[];
        statusCode: number;
        time: Date;
    }>;
    adminOrder(data: OrderCreateDto, req: Request): Promise<{
        data: {
            order: {
                description: string | null;
                id: string;
                status: import(".prisma/client").$Enums.OrderStatus;
                createdAt: Date;
                userId: string;
                read: boolean;
                orderType: import(".prisma/client").$Enums.OrderType | null;
                createdBy: string;
            };
            orderItems: import(".prisma/client").Prisma.BatchPayload;
        };
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
    checkOrder(id: string, data: OrderCheckDto): Promise<{
        data: never[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
    deleteAll(): Promise<{
        data: never[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
}
