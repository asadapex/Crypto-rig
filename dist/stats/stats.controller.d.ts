import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    getSummary(): Promise<{
        totalRevenueUSD: number;
        totalMiningProfitUSD: number;
        averagePurchaseValue: number;
        newUsersToday: number;
        activeDevices: number;
        inactiveDevices: number;
    }>;
    getTopUsers(): Promise<{
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
    getCharts(from?: string, to?: string): Promise<{
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
