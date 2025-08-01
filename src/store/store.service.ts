import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BuyVideoCardDto } from './dto/buy-video-card.dto';
import { OrderStatus } from '@prisma/client';
import { OrderCheckDto } from './dto/order-check.dto';
import { HttpService } from '@nestjs/axios';

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

  async buyCards(userId: string, data: BuyVideoCardDto) {
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

    const vdcard = await this.prisma.videoCard.findUnique({
      where: { id: data.videoCardId },
    });
    if (!vdcard) {
      throw new NotFoundException({
        data: [],
        messages: ['Video Card not found'],
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

    const btcAmount = parseFloat((vdcard.price / btcToUsdRate).toFixed(8));

    if (btcAmount > user.balance) {
      throw new BadRequestException({
        data: [],
        messages: ['Not enough balance'],
        statusCode: 400,
        time: new Date(),
      });
    }

    await this.prisma.order.create({
      data: {
        userId,
        videoCardId: data.videoCardId,
        count: data.count,
        status: OrderStatus.PENDING,
      },
    });

    return {
      data: [],
      messages: ['Order created'],
      statusCode: 200,
      time: new Date(),
    };
  }

  async myOrders(userId: string) {
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

    const all = await this.prisma.order.findMany({
      where: { userId },
      include: { videoCard: true },
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
      const order = await this.prisma.order.findUnique({ where: { id } });
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

        const vdcard = await this.prisma.videoCard.findUnique({
          where: { id: order.videoCardId },
        });
        if (!vdcard) {
          throw new NotFoundException({
            data: [],
            messages: ['Video Card not found'],
            statusCode: 404,
            time: new Date(),
          });
        }

        for (let i = 0; i < order.count; i++) {
          await this.prisma.userVideoCard.create({
            data: {
              userId: order.userId,
              videoCardId: order.videoCardId,
            },
          });
        }

        const btcToUsdRate = await this.getBtcToUsdRate();
        if (!btcToUsdRate || isNaN(btcToUsdRate)) {
          throw new InternalServerErrorException({
            message: 'Unable to fetch BTC rate',
          });
        }

        const btcAmount = parseFloat((vdcard.price / btcToUsdRate).toFixed(8));

        await this.prisma.user.update({
          where: { id: order.userId },
          data: { balance: { decrement: btcAmount } },
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
}
