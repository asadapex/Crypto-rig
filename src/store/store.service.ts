import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BuyVideoCardsDto } from './dto/buy-video-card.dto';
import { OrderStatus, OrderType } from '@prisma/client';
import { OrderCheckDto } from './dto/order-check.dto';
import { HttpService } from '@nestjs/axios';
import { OrderReadDto } from './dto/order-read.dto';

@Injectable()
export class StoreService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async getBtcToUsdRate(): Promise<number> {
    const url = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT';
    const response = await this.httpService.axiosRef.get(url);
    return parseFloat(response.data.price);
  }

  async buyCards(userId: string, dto: BuyVideoCardsDto, orderType?: OrderType) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user)
      throw new NotFoundException({
        data: [],
        messages: ['User not found'],
        statusCode: 404,
        time: new Date(),
      });
  
    if (user.verified === 0) {
      throw new BadRequestException({
        data: [],
        messages: ['User has not verified'],
        statusCode: 400,
        time: new Date(),
      });
    }
  
    const videoCardIds = dto.data.map(item => item.videoCardId);
    const videoCards = await this.prisma.videoCard.findMany({
      where: { id: { in: videoCardIds } },
    });
  
    if (videoCards.length !== videoCardIds.length) {
      const foundIds = videoCards.map(vc => vc.id);
      const notFoundIds = videoCardIds.filter(id => !foundIds.includes(id));
      throw new NotFoundException({
        data: [],
        messages: [`Video Cards not found: ${notFoundIds.join(', ')}`],
        statusCode: 404,
        time: new Date(),
      });
    }
  
    const btcToUsdRate = await this.getBtcToUsdRate();
    if (!btcToUsdRate || isNaN(btcToUsdRate)) {
      throw new InternalServerErrorException({
        message: 'Unable to fetch BTC rate',
      });
    }
  
    let totalBtcRequired = 0;
    for (const item of dto.data) {
      const card = videoCards.find(vc => vc.id === item.videoCardId)!;
      const btcAmount = parseFloat((card.price / btcToUsdRate).toFixed(8));
      totalBtcRequired += btcAmount * item.count;
    }
  
    if (totalBtcRequired > user.balance) {
      throw new BadRequestException({
        data: [],
        messages: ['Not enough balance'],
        statusCode: 400,
        time: new Date(),
      });
    }
    let order;
    if (orderType === OrderType.ADMIN) {
      order = await this.prisma.order.create({
        data: {
          userId,
          status: OrderStatus.PENDING,
          createdBy: userId,
          orderType: OrderType.ADMIN,
        },
      });
    } else {
        order = await this.prisma.order.create({
        data: {
          userId,
          status: OrderStatus.PENDING,
          createdBy: userId,
          orderType: OrderType.USER,
        },
      });
    }
  
    const orderItems = await this.prisma.orderItems.createMany({
      data: dto.data.map(item => ({
        orderId: order.id,
        videoCardId: item.videoCardId,
        count: item.count,
      })),
    });
  
    return {
      data: { order, orderItems },
      messages: ['Order created with items'],
      statusCode: 200,
      time: new Date(),
    };
  }

  async orderPatch(data: OrderReadDto, id: string) {
    try {
      const one = await this.prisma.order.findUnique({
        where: { id },
      });
      if (!one) {
        throw new NotFoundException({
          data: [],
          messages: ['Order not found'],
          statusCode: 404,
          time: new Date(),
        });
      }
      await this.prisma.order.update({
        where: { id },
        data: { read: data.read },
      });
      return {
        data: [],
        messages: ['Order updated'],
        statusCode: 200,
        time: new Date(),
      };
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException({ message: 'Server error' });
    }
  }

  async orders() {
    const all = await this.prisma.order.findMany({
      where: {
        NOT: {
          status: OrderStatus.ACCEPTED,
        },
      },
      include: { items: { include: { videoCard: true } }, user: { select: { id: true, email: true, role: true }}},
    });

    return {
      data: all,
      messages: [],
      statusCode: 200,
      time: new Date(),
    };
  }

  async checkOrder(id: string, data: OrderCheckDto) {
    try {
      const order = await this.prisma.order.findUnique({
        where: { id },
        include: { items: { include: { videoCard: true } }, user: { select: { id: true, email: true, role: true } } },
      });
  
      if (!order) {
        throw new NotFoundException({
          data: [],
          messages: ['Order not found'],
          statusCode: 404,
          time: new Date(),
        });
      }
  
      if (data.status === OrderStatus.ACCEPTED) {
        await this.prisma.order.update({
          where: { id },
          data: { status: data.status },
        });
  
        const btcToUsdRate = await this.getBtcToUsdRate();
        if (!btcToUsdRate || isNaN(btcToUsdRate)) {
          throw new InternalServerErrorException({
            message: 'Unable to fetch BTC rate',
          });
        }
  
        let totalBtc = 0;
  
        for (const item of order.items) {
          const vdcard = await this.prisma.videoCard.findUnique({
            where: { id: item.videoCardId },
          });
  
          if (!vdcard) {
            throw new NotFoundException({
              data: [],
              messages: [`Video Card not found: ${item.videoCardId}`],
              statusCode: 404,
              time: new Date(),
            });
          }
  
          for (let i = 0; i < item.count; i++) {
            await this.prisma.userVideoCard.create({
              data: {
                userId: order.userId,
                videoCardId: item.videoCardId,
              },
            });
          }
  
          const btcAmount = parseFloat((vdcard.price / btcToUsdRate).toFixed(8));
          totalBtc += btcAmount * item.count;
        }
  
        await this.prisma.user.update({
          where: { id: order.userId },
          data: { balance: { decrement: totalBtc } },
        });
  
        return {
          data: [],
          messages: ['Order accepted'],
          statusCode: 200,
          time: new Date(),
        };
      }
  
      if (data.status === OrderStatus.REJECTED) {
        await this.prisma.order.update({
          where: { id },
          data: { status: data.status, description: data.description },
        });
        return {
          data: [],
          messages: ['Order rejected'],
          statusCode: 200,
          time: new Date(),
        };
      }
  
      throw new BadRequestException({
        data: [],
        messages: ['Wrong status'],
        statusCode: 400,
        time: new Date(),
      });
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error;
      }
      console.log(error);
      throw new InternalServerErrorException({ message: 'Server error' });
    }
  }

  async deleteAll() {
    await this.prisma.orderItems.deleteMany({});
    await this.prisma.order.deleteMany({});
    return {
      data: [],
      messages: ['All orders deleted successfully'],
      statusCode: 200,
      time: new Date(),
    };
  }
}
