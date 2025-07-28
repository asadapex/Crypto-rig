import { PrismaService } from '../prisma/prisma.service';
import { BuyVideoCardDto } from './dto/buy-video-card.dto';
import { OrderCheckDto } from './dto/order-check.dto';
export declare class StoreService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    buyCards(userId: string, data: BuyVideoCardDto): Promise<{
        data: never[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
    myOrders(userId: string): Promise<{
        data: {
            id: string;
            userId: string;
            videoCardId: string;
            count: number;
            status: import(".prisma/client").$Enums.OrderStatus;
            description: string | null;
        }[];
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
