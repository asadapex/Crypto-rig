import { PrismaService } from 'src/prisma/prisma.service';
export declare class StatsService {
    private prisma;
    constructor(prisma: PrismaService);
    getSummary(): Promise<{
        totalRevenueUSD: number;
        totalMiningProfitUSD: number;
        averagePurchaseValue: number;
        newUsersToday: number;
        activeDevices: number;
        inactiveDevices: number;
    }>;
    getTopUsersByProfit(limit?: number): Promise<{
        userId: string;
        name: string;
        profitUSD: number;
    }[]>;
    getProductStats(): Promise<{
        totalProductsSold: number;
        mostPopularProducts: {
            name: string;
            sold: number;
        }[];
        unsoldProducts: {
            name: string;
            stock: number;
        }[];
    }>;
    getCharts(from?: Date, to?: Date): Promise<{
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
    }>;
}
