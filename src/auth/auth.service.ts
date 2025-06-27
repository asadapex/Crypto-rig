import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { UserStatus } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async findUser(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user;
  }

  async create(data: CreateAuthDto) {
    const user = await this.findUser(data.email);
    if (user) {
      throw new BadRequestException({ message: 'User already exists' });
    }

    try {
      const hash = bcrypt.hashSync(data.password, 10);
      const user = await this.prisma.user.create({
        data: { ...data, password: hash, status: UserStatus.ACTIVE },
      });

      const token = this.jwt.sign({ id: user.id });
      return { token };
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
        throw new NotFoundException({ message: 'User not found' });
      }

      const { name, surname, phoneNumber } = data;
      if (!name) throw new BadRequestException({ message: 'Name is required' });
      if (!surname)
        throw new BadRequestException({ message: 'Surname is required' });
      if (!phoneNumber)
        throw new BadRequestException({ message: 'Phone number is required' });

      await this.prisma.user.update({
        where: { id: req['user-id'] },
        data: { name, surname, phoneNumber, verified: 1 },
      });
      return { message: 'Verified' };
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
      throw new NotFoundException({ message: 'User not found' });
    }

    try {
      const match = bcrypt.compareSync(data.password, user.password);
      if (!match) {
        throw new BadRequestException({ message: 'Wrong credentials' });
      }

      const token = this.jwt.sign({ id: user.id });
      return { token };
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
        cards: true,
      },
    });

    if (!user) throw new NotFoundException({ message: 'User not found' });

    if (user.verified === 0) {
      throw new BadRequestException({
        message: 'User has not verified please verify',
      });
    }

    const data = {
      name: user.name,
      surname: user.surname,
      phoneNumber: user.phoneNumber,
      email: user.email,
      btc: user.btc,
      monthlyProfit: user.monthlyProfit,
      cards: user.cards.map((card) => ({
        type: card.type,
        createdAt: card.createdAt,
      })),
    };

    return {
      data,
      messages: ['User data fetched successfully'],
      statusCode: 200,
      time: new Date(),
    };
  }
}
