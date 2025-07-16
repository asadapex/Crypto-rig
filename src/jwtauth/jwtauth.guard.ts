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
  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException({
        data: [],
        messages: ['Token not provided or badly formatted'],
        statusCode: 401,
        time: new Date(),
      });
    }

    const token = authHeader.split(' ')[1];

    try {
      const data = this.jwt.verify(token);
      req['user-id'] = data.id;
      req['user-role'] = data.role;
      return true;
    } catch (error) {
      if (!(error instanceof UnauthorizedException)) {
        throw error;
      }
      console.log(error);
      throw new UnauthorizedException({
        data: [],
        messages: ['Wrong credentials'],
        statusCode: 401,
        time: new Date(),
      });
    }
  }
}
