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
                include: { videoCard: true },
            }),
            this.prisma.userVideoCard.aggregate({ _sum: { earned: true } }),
            this.prisma.order.aggregate({ _avg: { count: true } }),
            this.prisma.user.count({ where: { createdAt: { gte: today } } }),
            this.prisma.userVideoCard.count({ where: { status: 'ACTIVE' } }),
            this.prisma.userVideoCard.count({ where: { status: 'OFFLINE' } }),
        ]);
        const totalRevenueUSD = orders.reduce((acc, order) => {
            return acc + order.count * (order.videoCard?.price || 0);
        }, 0);
        return {
            data: [
                {
                    totalRevenueUSD,
                    totalMiningProfitUSD: totalProfit._sum.earned ?? 0,
                    averagePurchaseValue: avgOrder._avg.count ?? 0,
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
        const data = grouped.map((g) => {
            const user = users.find((u) => u.id === g.userId);
            return {
                userId: g.userId,
                name: user?.name ?? '',
                profitUSD: g._sum.profit ?? 0,
            };
        });
        return {
            data,
            messages: [],
            statusCode: 200,
        };
    }
    async getProductStats() {
        const [orders, mostPopular, unsoldProducts] = await Promise.all([
            this.prisma.order.aggregate({ _sum: { count: true } }),
            this.prisma.order.groupBy({
                by: ['videoCardId'],
                _sum: { count: true },
                orderBy: { _sum: { count: 'desc' } },
                take: 3,
            }),
            this.prisma.videoCard.findMany({
                where: {
                    Order: { none: {} },
                },
            }),
        ]);
        const topProducts = await Promise.all(mostPopular.map(async (item) => {
            const product = await this.prisma.videoCard.findUnique({
                where: { id: item.videoCardId },
            });
            return {
                name: `${product?.manufacturer} ${product?.model}`,
                sold: item._sum.count ?? 0,
            };
        }));
        const data = [
            {
                totalProductsSold: orders._sum.count ?? 0,
                mostPopularProducts: topProducts,
                unsoldProducts: unsoldProducts.map((p) => ({
                    name: `${p.manufacturer} ${p.model}`,
                    stock: p.price,
                })),
            },
        ];
        return {
            data,
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
                include: { videoCard: true },
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
            const revenue = order.count * (order.videoCard?.price ?? 0);
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
        const data = [
            {
                dailySales: Object.entries(dailySales).map(([date, revenueUSD]) => ({
                    date,
                    revenueUSD,
                })),
                dailyMiningProfit: Object.entries(dailyMiningProfit).map(([date, profitUSD]) => ({ date, profitUSD })),
                activeUsersOverTime: Object.entries(activeUsersOverTime).map(([date, count]) => ({ date, count })),
            },
        ];
        return {
            data,
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