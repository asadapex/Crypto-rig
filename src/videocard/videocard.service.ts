import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateVideocardDto } from './dto/create-videocard.dto';
import { UpdateVideocardDto } from './dto/update-videocard.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VideocardService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateVideocardDto) {
    try {
      const newCard = await this.prisma.videoCard.create({ data });
      return {
        data: [newCard],
        messages: ['Video Card created'],
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

  async findAll() {
    try {
      const data = await this.prisma.videoCard.findMany();
      return {
        data,
        messages: ['Video Cards fetched'],
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

  async findOne(id: string) {
    try {
      const one = await this.prisma.videoCard.findUnique({ where: { id } });
      if (!one) {
        throw new NotFoundException({
          data: [],
          messages: ['Video Card not found'],
          statusCode: 404,
          time: new Date(),
        });
      }
      return {
        data: [one],
        messages: ['Video Card fetched'],
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

  async update(id: string, data: UpdateVideocardDto) {
    try {
      const one = await this.prisma.videoCard.findUnique({ where: { id } });
      if (!one) {
        throw new NotFoundException({
          data: [],
          messages: ['Video Card not found'],
          statusCode: 404,
          time: new Date(),
        });
      }

      const updated = await this.prisma.videoCard.update({
        where: { id },
        data,
      });
      return {
        data: [updated],
        messages: ['Video Card updated'],
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

  async remove(id: string) {
    try {
      const one = await this.prisma.videoCard.findUnique({ where: { id } });
      if (!one) {
        throw new NotFoundException({
          data: [],
          messages: ['Video Card not found'],
          statusCode: 404,
          time: new Date(),
        });
      }
      const deleted = await this.prisma.videoCard.delete({ where: { id } });
      return {
        data: [deleted],
        messages: ['Video Card deleted'],
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
}
