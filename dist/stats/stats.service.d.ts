import { PrismaService } from 'src/prisma/prisma.service';
import { CalculateInvestmentDto } from './calculate-investment.dto';
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
    calculateInvestment(dto: CalculateInvestmentDto): Promise<{
        data: {
            videoCard: string;
            units: number;
            dailyIncome: number;
            monthlyIncome: number;
        };
        messages: never[];
        statusCode: number;
    }>;
}
