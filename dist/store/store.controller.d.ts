import { StoreService } from './store.service';
import { BuyVideoCardDto } from './dto/buy-video-card.dto';
import { Request } from 'express';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    buy(req: Request, dtos: BuyVideoCardDto[]): Promise<{
        data: never[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
    getCards(): Promise<{
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
