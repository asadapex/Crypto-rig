import { PrismaService } from '../prisma/prisma.service';
import { BuyVideoCardsDto } from './dto/buy-video-card.dto';
import { OrderCheckDto } from './dto/order-check.dto';
import { HttpService } from '@nestjs/axios';
import { OrderReadDto } from './dto/order-read.dto';
export declare class StoreService {
    private readonly prisma;
    private readonly httpService;
    constructor(prisma: PrismaService, httpService: HttpService);
    getBtcToUsdRate(): Promise<number>;
    buyCards(userId: string, dto: BuyVideoCardsDto): Promise<{
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
    myOrders(userId: string): Promise<{
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
    checkOrder(id: string, data: OrderCheckDto): Promise<{
        data: never[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
}
