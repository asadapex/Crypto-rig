"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const date_fns_1 = require("date-fns");
const prisma_service_1 = require("../prisma/prisma.service");
let StatsService = class StatsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSummary() {
        const today = (0, date_fns_1.startOfDay)(new Date());
        const [orders, totalProfit, avgOrder, newUsersToday, activeDevices, inactiveDevices,] = await Promise.all([
            this.prisma.order.findMany({
                include: {
                    items: { include: { videoCard: true } },
                },
            }),
            this.prisma.userVideoCard.aggregate({ _sum: { earned: true } }),
            this.prisma.orderItems.aggregate({ _avg: { count: true } }),
            this.prisma.user.count({ where: { createdAt: { gte: today } } }),
            this.prisma.userVideoCard.count({ where: { status: 'ACTIVE' } }),
            this.prisma.userVideoCard.count({ where: { status: 'OFFLINE' } }),
        ]);
        const totalRevenueUSD = orders.reduce((acc, order) => {
            const orderTotal = order.items.reduce((sum, item) => {
                return sum + item.count * (item.videoCard?.price || 0);
            }, 0);
            return acc + orderTotal;
        }, 0);
        return {
            data: [
                {
                    totalRevenueUSD,
                    totalMiningProfitUSD: totalProfit._sum.earned ?? 0,
                    averagePurchaseValue: avgOrder._avg?.count ?? 0,
                    newUsersToday,
                    activeDevices,
                    inactiveDevices,
                },
            ],
            messages: [],
            statusCode: 200,
        };
    }
    async getTopUsersByProfit(limit = 5) {
        const grouped = await this.prisma.monthlyProfits.groupBy({
            by: ['userId'],
            _sum: { profit: true },
            orderBy: { _sum: { profit: 'desc' } },
            take: limit,
        });
        const userIds = grouped.map((g) => g.userId);
        const users = await this.prisma.user.findMany({
            where: { id: { in: userIds } },
        });
        const realData = grouped.map((g) => {
            const user = users.find((u) => u.id === g.userId);
            return {
                userId: g.userId,
                name: user?.name ?? '',
                profitUSD: g._sum.profit ?? 0,
            };
        });
        return {
            data: realData,
            messages: [],
            statusCode: 200,
        };
    }
    async getProductStats() {
        const orders = await this.prisma.order.findMany({
            include: { items: true },
        });
        const totalProductsSold = orders.reduce((acc, order) => {
            return (acc +
                order.items.reduce((sum, item) => sum + item.count, 0));
        }, 0);
        const itemStats = await this.prisma.orderItems.groupBy({
            by: ['videoCardId'],
            _sum: { count: true },
            orderBy: { _sum: { count: 'desc' } },
            take: 3,
        });
        const topProducts = await Promise.all(itemStats.map(async (item) => {
            const product = await this.prisma.videoCard.findUnique({
                where: { id: item.videoCardId },
            });
            return {
                name: `${product?.manufacturer} ${product?.model}`,
                sold: item._sum.count ?? 0,
            };
        }));
        const unsoldProducts = await this.prisma.videoCard.findMany({
            where: {
                OrderItems: { none: {} },
            },
        });
        return {
            data: [
                {
                    totalProductsSold,
                    mostPopularProducts: topProducts,
                    unsoldProducts: unsoldProducts.map((p) => ({
                        name: `${p.manufacturer} ${p.model}`,
                        sold: 0,
                    })),
                },
            ],
            messages: [],
            statusCode: 200,
        };
    }
    async getCharts(from, to) {
        const start = from ?? (0, date_fns_1.subDays)(new Date(), 30);
        const end = to ?? new Date();
        const [orders, profits, activeUsers] = await Promise.all([
            this.prisma.order.findMany({
                where: { createdAt: { gte: start, lte: end } },
                include: { items: { include: { videoCard: true } } },
            }),
            this.prisma.monthlyProfits.findMany({
                where: { date: { gte: start, lte: end } },
            }),
            this.prisma.user.findMany({
                where: { createdAt: { gte: start, lte: end } },
            }),
        ]);
        const dailySales = {};
        for (const order of orders) {
            const date = order.createdAt.toISOString().split('T')[0];
            const revenue = order.items.reduce((sum, item) => {
                return sum + item.count * (item.videoCard?.price ?? 0);
            }, 0);
            dailySales[date] = (dailySales[date] || 0) + revenue;
        }
        const dailyMiningProfit = {};
        for (const profit of profits) {
            const date = profit.date.toISOString().split('T')[0];
            dailyMiningProfit[date] =
                (dailyMiningProfit[date] || 0) + profit.profit;
        }
        const activeUsersOverTime = {};
        for (const user of activeUsers) {
            const date = user.createdAt.toISOString().split('T')[0];
            activeUsersOverTime[date] =
                (activeUsersOverTime[date] || 0) + 1;
        }
        return {
            data: [
                {
                    dailySales: Object.entries(dailySales).map(([date, revenueUSD]) => ({
                        date,
                        revenueUSD,
                    })),
                    dailyMiningProfit: Object.entries(dailyMiningProfit).map(([date, profitUSD]) => ({ date, profitUSD })),
                    activeUsersOverTime: Object.entries(activeUsersOverTime).map(([date, count]) => ({ date, count })),
                },
            ],
            messages: [],
            statusCode: 200,
        };
    }
    async calculateInvestment(dto) {
        const { videoCardId, investment } = dto;
        const device = await this.prisma.videoCard.findUnique({
            where: { id: videoCardId },
        });
        if (!device) {
            throw new common_1.NotFoundException({ data: [], messages: ['Device not found'], statusCode: 404, time: new Date() });
        }
        if (!device.price || !device.hashRate || !device.powerUsage) {
            throw new common_1.BadRequestException({ data: [], messages: ['Device details not found'], statusCode: 400, time: new Date() });
        }
        if (investment < 1000) {
            throw new common_1.BadRequestException({ data: [], messages: ['Minimal investment amount is $1000'], statusCode: 400, time: new Date() });
        }
        const [minHashRate, maxHashRate] = device.hashRate.split(' - ').map(num => parseFloat(num)) || [0, 0];
        const [minPowerUsage, maxPowerUsage] = device.powerUsage.split(' - ').map(num => parseFloat(num)) || [0, 0];
        const avgHashRate = (minHashRate + maxHashRate) / 2 || 0;
        const avgPowerUsage = (minPowerUsage + maxPowerUsage) / 2 || 0;
        if (isNaN(avgHashRate) || isNaN(avgPowerUsage)) {
            throw new common_1.BadRequestException({ data: [], messages: ['Hashrate or power usage is not in the correct format'], statusCode: 400, time: new Date() });
        }
        const btcPrice = 60000;
        const electricityCost = 0.05;
        const dailyProfitPerUnit = 0.002;
        const dailyPowerCostPerUnit = (avgPowerUsage * 24) / 1000 * electricityCost;
        const units = Math.floor(investment / device.price);
        if (units === 0) {
            throw new common_1.BadRequestException({ data: [], messages: ['Investment amount is less than the price of one video card'], statusCode: 400, time: new Date() });
        }
        let totalDailyBtc = dailyProfitPerUnit * units;
        let totalDailyIncome = (totalDailyBtc * btcPrice) - (dailyPowerCostPerUnit * units);
        totalDailyIncome = totalDailyIncome * 0.040;
        const monthlyIncome = totalDailyIncome * 30;
        return {
            data: {
                videoCard: device.model,
                units,
                dailyIncome: Number(totalDailyIncome.toFixed(2)),
                monthlyIncome: Number(monthlyIncome.toFixed(2)),
            },
            messages: [],
            statusCode: 200,
        };
    }
};
exports.StatsService = StatsService;
exports.StatsService = StatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StatsService);
//# sourceMappingURL=stats.service.js.map