import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BuyVideoCardDto } from './dto/buy-video-card.dto';
import { VideoCardType } from '@prisma/client';
import { VideoCardInfo } from 'src/VideoCards/VideoCardInfo';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}

  async buyCards(userId: string, dtos: BuyVideoCardDto[]) {
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

    for (const dto of dtos) {
      const videoCardExists = Object.values(VideoCardType).includes(dto.type);
      if (!videoCardExists) {
        throw new NotFoundException({
          data: [],
          messages: [`Video card not found: ${dto.type}`],
          statusCode: 404,
          time: new Date(),
        });
      }

      const createManyData = Array.from({ length: dto.count }).map(() => ({
        userId,
        type: dto.type,
      }));

      await this.prisma.userVideoCard.createMany({
        data: createManyData,
      });
    }

    return {
      data: [],
      messages: [`Video cards added`],
      statusCode: 200,
      time: new Date(),
    };
  }

  async getAllVideoCards() {
    const data = Object.entries(VideoCardInfo).map(([type, info]) => ({
      type,
      ...info,
    }));

    return {
      data,
      messages: [`Video cards fetched successfully`],
      statusCode: 200,
      time: new Date(),
    };
  }
}
