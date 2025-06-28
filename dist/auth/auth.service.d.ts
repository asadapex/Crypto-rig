import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    findUser(email: string): Promise<{
        email: string;
        password: string;
        name: string | null;
        surname: string | null;
        phoneNumber: string | null;
        id: string;
        verified: number;
        btc: number;
        monthlyProfit: number;
        status: import(".prisma/client").$Enums.UserStatus;
        createdAt: Date;
    } | null>;
    create(data: CreateAuthDto): Promise<{
        data: {
            token: string;
        }[];
        messages: string[];
        statusCode: number;
        time: Date;
    } | undefined>;
    verify(req: Request, data: VerifyAuthDto): Promise<{
        data: {
            name: string;
            surname: string;
            phoneNumber: string;
        }[];
        messages: string[];
        statusCode: number;
        time: Date;
    } | undefined>;
    login(data: CreateAuthDto): Promise<{
        data: {
            token: string;
        }[];
        messages: string[];
        statusCode: number;
        time: Date;
    } | undefined>;
    findMe(req: Request): Promise<{
        data: {
            name: string | null;
            surname: string | null;
            phoneNumber: string | null;
            email: string;
            btc: number;
            monthlyProfit: number;
            cards: {
                type: import(".prisma/client").$Enums.VideoCardType;
                createdAt: Date;
                hashRate: number;
            }[];
        };
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
}
