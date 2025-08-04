import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { Status } from '@prisma/client';
import { startOfMonth, subMonths } from 'date-fns';

@Injectable()
export class MiningService {
  constructor(private readonly prisma: PrismaService) {}

  @Cron('0 0 1 * *')
  async resetMonthlyProfit() {
    await this.prisma.user.updateMany({
      data: { monthlyProfit: 0 },
    });
  }

  @Cron('* * * * *')
  async handleMining() {
    const userCards = await this.prisma.userVideoCard.findMany({
      where: {
        status: Status.ACTIVE,
      },
    });

    const updates = userCards.map((card) =>
      this.prisma.userVideoCard.update({
        where: { id: card.id },
        data: {
          earned: {
            increment: 0.0037,
          },
        },
      }),
    );

    await this.prisma.$transaction(updates);
    console.log(`[MINING] ${userCards.length} ACTIVE cards updated`);
  }

   @Cron('5 0 1 * *')
  async createMonthlyProfits() {
    const users = await this.prisma.user.findMany();

    const lastMonthStart = startOfMonth(subMonths(new Date(), 1));

    for (const user of users) {
      await this.prisma.monthlyProfits.upsert({
        where: {
          userId_date: {
            userId: user.id,
            date: lastMonthStart,
          },
        },
        update: {
          profit: user.monthlyProfit,
        },
        create: {
          userId: user.id,
          date: lastMonthStart,
          profit: user.monthlyProfit,
        },
      });

      console.log(`✅ Profit saved for ${user.email}: $${user.monthlyProfit}`);
    }
  }
}
