import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { Status } from '@prisma/client';

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
}
