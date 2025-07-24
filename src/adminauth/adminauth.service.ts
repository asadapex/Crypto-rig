import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-adminauth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Request } from 'express';
import { WithdrawReq } from './dto/withdraw-status.dto';
import { WithdrawStatus, WithdrawType } from '@prisma/client';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AdminauthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly httpService: HttpService,
  ) {}

  async getBtcToUsdRate(): Promise<number> {
    const url = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT';
    const response = await this.httpService.axiosRef.get(url);
    return parseFloat(response.data.price);
  }

  async create(data: CreateAdminDto) {
    try {
      const admin = await this.prisma.user.findUnique({
        where: { email: data.email },
      });
      if (admin) {
        throw new BadRequestException({
          data: [],
          messages: ['Admin already exists'],
          statusCode: 400,
          time: new Date(),
        });
      }
      const hash = bcrypt.hashSync(data.password, 10);
      const newAdmin = await this.prisma.user.create({
        data: { ...data, password: hash, verified: 1 },
      });
      const token = this.jwt.sign({ id: newAdmin.id, role: data.role });
      return {
        data: [{ token }],
        messages: ['Admin registered'],
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

  async login(data: LoginAdminDto) {
    try {
      const admin = await this.prisma.user.findUnique({
        where: { email: data.email },
      });
      if (!admin) {
        throw new NotFoundException({
          data: [],
          messages: ['Admin not found'],
          statusCode: 404,
          time: new Date(),
        });
      }
      const match = bcrypt.compareSync(data.password, admin.password);
      if (!match)
        throw new BadRequestException({
          data: [],
          messages: ['Wrong credentials'],
          statusCode: 400,
          time: new Date(),
        });
      const token = this.jwt.sign({ id: admin.id, role: admin.role });
      return {
        data: [{ token }],
        messages: [],
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
    const all = await this.prisma.admin.findMany();
    return all;
  }

  async findMe(req: Request) {
    try {
      const admin = await this.prisma.admin.findUnique({
        where: { id: req['user-id'] },
      });
      if (!admin) {
        throw new NotFoundException({
          data: [],
          messages: ['Admin not found'],
          statusCode: 404,
          time: new Date(),
        });
      }
      return {
        data: [
          {
            id: admin.id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
          },
        ],
        messages: [],
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

  async withdrawReqView() {
    try {
      const all = await this.prisma.withdraw.findMany();
      return {
        data: [all],
        messages: [],
        statusCode: 200,
        time: new Date(),
      };
    } catch (error) {
      if (error != InternalServerErrorException) {
        throw error;
      }

      throw new InternalServerErrorException({ message: 'Server error' });
    }
  }

  async withdrawReq(data: WithdrawReq) {
    try {
      const withdraw = await this.prisma.withdraw.findUnique({
        where: { id: data.id },
      });

      if (!withdraw) {
        throw new NotFoundException({
          data: [],
          messages: ['Withdraw request not found'],
          statusCode: 404,
          time: new Date(),
        });
      }

      if (data.status === WithdrawStatus.ACCEPTED) {
        const btcToUsdRate = await this.getBtcToUsdRate();
        if (!btcToUsdRate || isNaN(btcToUsdRate)) {
          throw new InternalServerErrorException({
            message: 'Unable to fetch BTC rate',
          });
        }

        const btcAmount = parseFloat(
          (withdraw.amount / btcToUsdRate).toFixed(8),
        );

        const updateBalance =
          withdraw.type === WithdrawType.TOPUP
            ? { increment: btcAmount }
            : { decrement: btcAmount };

        await this.prisma.user.update({
          where: { id: withdraw.userId },
          data: {
            balance: updateBalance,
          },
        });
      }

      await this.prisma.withdraw.update({
        where: { id: data.id },
        data: { status: data.status },
      });

      return {
        data: [],
        messages: ['Withdraw request updated'],
        statusCode: 200,
        time: new Date(),
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException({ message: 'Server error' });
    }
  }
}
