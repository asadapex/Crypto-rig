import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { TopupBalanceDto } from './dto/topup-balance.dto';
import { WithdrawStatus, WithdrawType } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findUser(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  async create(data: CreateUserDto) {
    const user = await this.findUser(data.email);
    if (user) {
      throw new BadRequestException({
        data: [],
        messages: ['User already exists'],
        statusCode: 400,
        time: new Date(),
      });
    }

    try {
      const hash = bcrypt.hashSync(data.password, 10);
      const user = await this.prisma.user.create({
        data: { ...data, password: hash },
      });

      return {
        data: [user],
        messages: ['User registered'],
        statusCode: 200,
        time: new Date(),
      };
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error;
      }
      console.log(error);
    }
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return {
      data: users,
      messages: [],
      statusCode: 200,
      time: new Date(),
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return {
      data: [user],
      messages: [],
      statusCode: 200,
      time: new Date(),
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException({
        data: [],
        messages: ['User not found'],
        statusCode: 404,
        time: new Date(),
      });
    }
    const updated = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return {
      data: [updated],
      messages: [],
      statusCode: 200,
      time: new Date(),
    };
  }

  async remove(id: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException({
          data: [],
          messages: ['User not found'],
          statusCode: 404,
          time: new Date(),
        });
      }

      await this.prisma.userVideoCard.deleteMany({ where: { userId: id } });
      const deleted = await this.prisma.user.delete({ where: { id } });

      return {
        data: [deleted],
        messages: ['User deleted'],
        statusCode: 200,
        time: new Date(),
      };
    } catch (error) {
      console.log(error);
    }
  }

  async topupBalance(req: Request, data: TopupBalanceDto) {
    try {
      if (data.amount <= 0) {
        throw new BadRequestException({
          data: [],
          messages: ['Invalid amount'],
          statusCode: 400,
          time: new Date(),
        });
      }
      // await this.prisma.user.update({
      //   where: { id: req['user-id'] },
      //   data: {
      //     balance: {
      //       increment: data.amount / 100000,
      //     },
      //   },
      // });

      await this.prisma.withdraw.create({
        data: {
          amount: data.amount,
          type: WithdrawType.TOPUP,
          paymentMethod: data.paymentMethod,
          status: WithdrawStatus.PENDING,
          userId: req['user-id'],
        },
      });
      return {
        data: [],
        messages: ['Balance top-up request created'],
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
