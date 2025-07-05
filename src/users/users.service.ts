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
    const updated = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return updated;
  }

  async remove(id: string) {
    return `This action removes a #${id} user`;
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
