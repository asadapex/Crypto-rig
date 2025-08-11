import { PrismaService } from 'src/prisma/prisma.service';
export declare class StatsService {
    private prisma;
    constructor(prisma: PrismaService);
    getSummary(): Promise<{
        data: {
            totalRevenueUSD: number;
            totalMiningProfitUSD: number;
            averagePurchaseValue: number;
            newUsersToday: number;
            activeDevices: number;
            inactiveDevices: number;
        }[];
        messages: never[];
        statusCode: number;
    }>;
    getTopUsersByProfit(limit?: number): Promise<{
        data: {
            userId: string;
            name: string;
            profitUSD: number;
        }[];
        messages: never[];
        statusCode: number;
    }>;
    getProductStats(): Promise<{
        data: {
            totalProductsSold: number;
            mostPopularProducts: {
                name: string;
                sold: number;
            }[];
            unsoldProducts: {
                name: string;
                sold: number;
            }[];
        }[];
        messages: never[];
        statusCode: number;
    }>;
    getCharts(from?: Date, to?: Date): Promise<{
        data: {
            dailySales: {
                date: string;
                revenueUSD: unknown;
            }[];
            dailyMiningProfit: {
                date: string;
                profitUSD: unknown;
            }[];
            activeUsersOverTime: {
                date: string;
                count: unknown;
            }[];
        }[];
        messages: never[];
        statusCode: number;
    }>;
}
