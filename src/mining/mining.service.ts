// import { Injectable } from '@nestjs/common';
// import { Cron } from '@nestjs/schedule';
// import { PrismaService } from '../prisma/prisma.service';

// @Injectable()
// export class MiningService {
//   constructor(private readonly prisma: PrismaService) {}

//   @Cron('0 0 1 * *')
//   async resetMonthlyProfit() {
//     await this.prisma.user.updateMany({
//       data: { monthlyProfit: 0 },
//     });
//   }

//   @Cron('0 0 * * *')
//   async handleMining() {
//     const users = await this.prisma.user.findMany({
//       include: {
//         cards: {
//           include: {
//             videcard: true,
//           },
//         },
//       },
//     });

//     for (const user of users) {
//       const totalProfit = user.cards.reduce((acc, card) => {
//         const hashRate = card.videcard.hashRate;
//         return typeof hashRate === 'number' ? acc + hashRate * 24 : acc;
//       }, 0);

//       if (totalProfit > 0) {
//         await this.prisma.user.update({
//           where: { id: user.id },
//           data: {
//             btc: { increment: totalProfit },
//             monthlyProfit: { increment: totalProfit },
//           },
//         });
//       }
//     }
//   }
// }
