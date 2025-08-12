import { Injectable } from '@nestjs/common';
import { subDays, startOfDay } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async getSummary() {
    const today = startOfDay(new Date());

    const [
      orders,
      totalProfit,
      avgOrder,
      newUsersToday,
      activeDevices,
      inactiveDevices,
    ] = await Promise.all([
      this.prisma.order.findMany({
        include: {
          items: { include: { videoCard: true } },
        },
      }),
      this.prisma.userVideoCard.aggregate({ _sum: { earned: true } }),
      this.prisma.orderItems.aggregate({ _avg: { count: true } }), // Avg by item count
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
    // Umumiy sotilgan miqdor
    const orders = await this.prisma.order.findMany({
      include: { items: true },
    });

    const totalProductsSold = orders.reduce((acc, order) => {
      return (
        acc +
        order.items.reduce((sum, item) => sum + item.count, 0)
      );
    }, 0);

    // Eng ko‘p sotilgan mahsulotlar
    const itemStats = await this.prisma.orderItems.groupBy({
      by: ['videoCardId'],
      _sum: { count: true },
      orderBy: { _sum: { count: 'desc' } },
      take: 3,
    });

    const topProducts = await Promise.all(
      itemStats.map(async (item) => {
        const product = await this.prisma.videoCard.findUnique({
          where: { id: item.videoCardId },
        });
        return {
          name: `${product?.manufacturer} ${product?.model}`,
          sold: item._sum.count ?? 0,
        };
      }),
    );

    // Sotilmagan mahsulotlar
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

  async getCharts(from?: Date, to?: Date) {
    const start = from ?? subDays(new Date(), 30);
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

    const dailySales: Record<string, number> = {};
    for (const order of orders) {
      const date = order.createdAt.toISOString().split('T')[0];
      const revenue = order.items.reduce((sum, item) => {
        return sum + item.count * (item.videoCard?.price ?? 0);
      }, 0);
      dailySales[date] = (dailySales[date] || 0) + revenue;
    }

    const dailyMiningProfit: Record<string, number> = {};
    for (const profit of profits) {
      const date = profit.date.toISOString().split('T')[0];
      dailyMiningProfit[date] =
        (dailyMiningProfit[date] || 0) + profit.profit;
    }

    const activeUsersOverTime: Record<string, number> = {};
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
          dailyMiningProfit: Object.entries(dailyMiningProfit).map(
            ([date, profitUSD]) => ({ date, profitUSD }),
          ),
          activeUsersOverTime: Object.entries(activeUsersOverTime).map(
            ([date, count]) => ({ date, count }),
          ),
        },
      ],
      messages: [],
      statusCode: 200,
    };
  }
}
