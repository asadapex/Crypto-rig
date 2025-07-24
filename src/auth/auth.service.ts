import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { VdcardStatusDto } from './dto/vdcard-status.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { UserRole, WithdrawStatus } from '@prisma/client';
import { CollectUserBalanceDto } from './dto/collect-balance.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthService {
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

  async findUser(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  async create(data: CreateAuthDto) {
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

      const token = this.jwt.sign({ id: user.id, role: user.role });
      return {
        data: [{ token }],
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

  async verify(req: Request, data: VerifyAuthDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: req['user-id'] },
      });
      if (!user) {
        throw new NotFoundException({
          data: [],
          messages: ['User not found'],
          statusCode: 404,
          time: new Date(),
        });
      }
      if (
        user.role == UserRole.ADMIN ||
        user.role == UserRole.SUPPORT ||
        user.role == UserRole.VIEWER
      ) {
        throw new BadRequestException({
          data: [],
          messages: ['No need to verify'],
          statusCode: 400,
          time: new Date(),
        });
      }

      const { name, surname, phoneNumber } = data;
      if (!name)
        throw new BadRequestException({
          data: [],
          messages: ['Name is required'],
          statusCode: 400,
          time: new Date(),
        });
      if (!surname)
        throw new BadRequestException({
          data: [],
          messages: ['Surname is required'],
          statusCode: 400,
          time: new Date(),
        });
      if (!phoneNumber)
        throw new BadRequestException({
          data: [],
          messages: ['Phone number is required'],
          statusCode: 400,
          time: new Date(),
        });

      await this.prisma.user.update({
        where: { id: req['user-id'] },
        data: { name, surname, phoneNumber, verified: 1 },
      });
      return {
        data: [{ name, surname, phoneNumber }],
        messages: ['User verified'],
        statusCode: 200,
        time: new Date(),
      };
    } catch (err) {
      if (err != InternalServerErrorException) {
        throw err;
      }
      console.log(err);
    }
  }

  async login(data: CreateAuthDto) {
    const user = await this.findUser(data.email);
    if (!user) {
      throw new NotFoundException({
        data: [],
        messages: ['User not found'],
        statusCode: 404,
        time: new Date(),
      });
    }

    try {
      const match = bcrypt.compareSync(data.password, user.password);
      if (!match) {
        throw new BadRequestException({
          data: [],
          messages: ['Wrong credentials'],
          statusCode: 400,
          time: new Date(),
        });
      }

      const token = this.jwt.sign({ id: user.id, role: user.role });
      return {
        data: [{ token }],
        messages: ['User logged in'],
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

  async collectUserBalance(req: Request, data: CollectUserBalanceDto) {
    try {
      const userVideoCard = await this.prisma.userVideoCard.findFirst({
        where: { userId: req['user-id'], id: data.id },
      });
      if (!userVideoCard) {
        throw new NotFoundException({
          data: [],
          messages: ['Not found'],
          statusCode: 404,
          time: new Date(),
        });
      }

      if (userVideoCard.earned == 0)
        throw new BadRequestException({
          data: [],
          messages: ['Mining device has not earned yet'],
          statusCode: 400,
          time: new Date(),
        });

      const user = await this.prisma.user.findUnique({
        where: { id: req['user-id'] },
      });

      if (!user) {
        throw new NotFoundException({
          data: [],
          messages: ['User not found'],
          statusCode: 404,
          time: new Date(),
        });
      }

      await this.prisma.$transaction([
        this.prisma.user.update({
          where: { id: req['user-id'] },
          data: { balance: user?.balance + userVideoCard.earned },
        }),
        this.prisma.userVideoCard.update({
          where: { id: userVideoCard.id },
          data: { earned: 0 },
        }),
      ]);

      return {
        data: [],
        messages: ['Money collected'],
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

  async findMe(req: Request) {
    const user = await this.prisma.user.findUnique({
      where: { id: req['user-id'] },
      include: {
        cards: {
          include: {
            videcard: true,
          },
        },
      },
    });

    if (!user)
      throw new NotFoundException({
        data: [],
        messages: ['User not found'],
        statusCode: 404,
        time: new Date(),
      });

    const data = {
      name: user.name,
      surname: user.surname,
      phoneNumber: user.phoneNumber,
      email: user.email,
      verified: user.verified,
      balance: user.balance,
      monthlyProfit: user.monthlyProfit,
      cards: user.cards.map((card) => {
        return {
          id: card.id,
          image: card.videcard.image,
          type: `${card.videcard.manufacturer} ${card.videcard.model}`,
          createdAt: card.createdAt,
          hashRate: card.videcard.hashRate,
          earned: card.earned,
          status: card.status,
        };
      }),
    };

    return {
      data,
      messages: [],
      statusCode: 200,
      time: new Date(),
    };
  }

  async withdrawBalance(req: Request, data: WithdrawDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: req['user-id'] },
      });

      if (!user) {
        throw new BadRequestException({
          data: [],
          messages: ['User not found'],
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

      const btcAmount = parseFloat((data.amount / btcToUsdRate).toFixed(8));

      if (user.balance < btcAmount) {
        return {
          data: [],
          messages: ['Not enough BTC balance'],
          statusCode: 400,
          time: new Date(),
        };
      }

      const withdrawreq = await this.prisma.withdraw.create({
        data: {
          amount: data.amount,
          paymentMethod: data.paymentMethod,
          status: WithdrawStatus.PENDING,
          userId: user.id,
          cardNumber: data.cardNumber,
        },
      });

      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          balance: {
            decrement: btcAmount,
          },
        },
      });

      return {
        data: [withdrawreq],
        messages: ['Withdraw request created'],
        statusCode: 200,
        time: new Date(),
      };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException({ message: 'Server error' });
    }
  }

  async withdrawRequests(req: Request) {
    try {
      const withdraws = await this.prisma.withdraw.findMany({
        where: { userId: req['user-id'] },
      });
      return {
        data: withdraws,
        messages: [''],
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

  async updateStatus(userId: string, data: VdcardStatusDto) {
    const userCard = await this.prisma.userVideoCard.findUnique({
      where: { id: data.id },
    });

    if (!userCard) {
      throw new NotFoundException({
        data: [],
        messages: ['Video card not found'],
        statusCode: 404,
        time: new Date(),
      });
    }

    if (userCard.userId !== userId) {
      throw new ForbiddenException({
        data: [],
        messages: ['You are not allowed to update this card'],
        statusCode: 403,
        time: new Date(),
      });
    }

    const updated = await this.prisma.userVideoCard.update({
      where: { id: data.id },
      data: { status: data.status },
    });

    return {
      data: [updated],
      messages: ['Status changed'],
      statusCode: 200,
      time: new Date(),
    };
  }
}
