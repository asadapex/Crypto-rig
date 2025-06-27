import { PrismaService } from '../prisma/prisma.service';
import { BuyVideoCardDto } from './dto/buy-video-card.dto';
export declare class StoreService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    buyCards(userId: string, dtos: BuyVideoCardDto[]): Promise<{
        data: never[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
    getAllVideoCards(): Promise<{
        data: {
            hashRate: number;
            price: number;
            type: string;
        }[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
}
