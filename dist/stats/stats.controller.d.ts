import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
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
    getTopUsers(): Promise<{
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
    getCharts(from?: string, to?: string): Promise<{
        data: {
            dailySales: {
                date: string;
                revenueUSD: number;
            }[];
            dailyMiningProfit: {
                date: string;
                profitUSD: number;
            }[];
            activeUsersOverTime: {
                date: string;
                count: number;
            }[];
        }[];
        messages: never[];
        statusCode: number;
    }>;
}
