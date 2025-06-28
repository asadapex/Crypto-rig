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
        data: { ...data, password: hash, status: UserStatus.ACTIVE },
      });

      const token = this.jwt.sign({ id: user.id });
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

      const token = this.jwt.sign({ id: user.id });
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

  async findMe(req: Request) {
    const user = await this.prisma.user.findUnique({
      where: { id: req['user-id'] },
      include: {
        cards: true,
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
      btc: user.btc,
      monthlyProfit: user.monthlyProfit,
      cards: user.cards.map((card) => ({
        type: card.type,
        createdAt: card.createdAt,
      })),
    };

    return {
      data,
      messages: [''],
      statusCode: 200,
      time: new Date(),
    };
  }
}
