import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')?.[1];

    if (!token) {
      throw new UnauthorizedException({
        data: [],
        messages: ['Token not provided'],
        statusCode: 401,
        time: new Date(),
      });
    }

    try {
      const data = this.jwt.verify(token);
      req['user-id'] = data.id;
      req['user-role'] = data.role;

      return true;
    } catch (error) {
      if (error != UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException({
        data: [],
        messages: ['Wrong credentials'],
        statusCode: 401,
        time: new Date(),
      });
    }
  }
}
