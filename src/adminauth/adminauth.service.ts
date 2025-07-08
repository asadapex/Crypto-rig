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

@Injectable()
export class AdminauthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}
  async create(data: CreateAdminDto) {
    try {
      const admin = await this.prisma.admin.findUnique({
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
      const newAdmin = await this.prisma.admin.create({
        data: { ...data, password: hash },
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
      const admin = await this.prisma.admin.findUnique({
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
}
