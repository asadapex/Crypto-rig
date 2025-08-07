import { PrismaService } from 'src/prisma/prisma.service';
interface IAnyObject {
    [key: string]: any;
}
export interface IServiceReponse {
    data: IAnyObject[];
    messages: IAnyObject[];
    statusCode: number;
}
export declare class StatsService {
    private prisma;
    constructor(prisma: PrismaService);
    getSummary(): Promise<IServiceReponse>;
    getTopUsersByProfit(limit?: number): Promise<IServiceReponse>;
    getProductStats(): Promise<IServiceReponse>;
    getCharts(from?: Date, to?: Date): Promise<IServiceReponse>;
}
export {};
