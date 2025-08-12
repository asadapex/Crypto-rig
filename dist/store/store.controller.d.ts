import { StoreService } from './store.service';
import { BuyVideoCardsDto } from './dto/buy-video-card.dto';
import { Request } from 'express';
import { OrderCheckDto } from './dto/order-check.dto';
import { OrderReadDto } from './dto/order-read.dto';
import { OrderCreateDto } from './dto/order-create-dto';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    buy(req: Request, data: BuyVideoCardsDto): Promise<{
        data: {
            order: {
                id: string;
                userId: string;
                read: boolean;
                status: import(".prisma/client").$Enums.OrderStatus;
                description: string | null;
                createdAt: Date;
                createdBy: string;
            };
            orderItems: import(".prisma/client").Prisma.BatchPayload;
        };
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
    orderPatch(data: OrderReadDto, id: string): Promise<{
        data: never[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
    myOrders(req: Request): Promise<{
        data: ({
            user: {
                id: string;
                email: string;
            };
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
                orderId: string;
                videoCardId: string;
                count: number;
            })[];
        } & {
            id: string;
            userId: string;
            read: boolean;
            status: import(".prisma/client").$Enums.OrderStatus;
            description: string | null;
            createdAt: Date;
            createdBy: string;
        })[];
        messages: never[];
        statusCode: number;
        time: Date;
    }>;
    adminOrder(data: OrderCreateDto): Promise<{
        data: {
            order: {
                id: string;
                userId: string;
                read: boolean;
                status: import(".prisma/client").$Enums.OrderStatus;
                description: string | null;
                createdAt: Date;
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
