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
                description: string | null;
                id: string;
                status: import(".prisma/client").$Enums.OrderStatus;
                createdAt: Date;
                userId: string;
                read: boolean;
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
            items: {
                id: string;
                videoCardId: string;
                count: number;
                orderId: string;
            }[];
        } & {
            description: string | null;
            id: string;
            status: import(".prisma/client").$Enums.OrderStatus;
            createdAt: Date;
            userId: string;
            read: boolean;
            createdBy: string;
        })[];
        messages: never[];
        statusCode: number;
        time: Date;
    }>;
    adminOrder(data: OrderCreateDto): Promise<{
        data: {
            order: {
                description: string | null;
                id: string;
                status: import(".prisma/client").$Enums.OrderStatus;
                createdAt: Date;
                userId: string;
                read: boolean;
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
}
