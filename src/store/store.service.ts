import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BuyVideoCardDto } from './dto/buy-video-card.dto';

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
      const videoCard = await this.prisma.videoCard.findUnique({
        where: {
          id: dto.type,
        },
      });

      if (!videoCard) {
        throw new NotFoundException({
          data: [],
          messages: [`Video card not found: ${dto.type}`],
          statusCode: 404,
          time: new Date(),
        });
      }

      const createManyData = Array.from({ length: dto.count }).map(() => ({
        userId,
        videoCardId: videoCard.id,
      }));

      await this.prisma.userVideoCard.createMany({
        data: createManyData,
      });
    }

    return {
      data: [],
      messages: ['Video cards added'],
      statusCode: 200,
      time: new Date(),
    };
  }
}
