import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { VdcardStatusDto } from './dto/vdcard-status.dto';
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
        balance: number;
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
            verified: number;
            btc: number;
            monthlyProfit: number;
            cards: {
                id: string;
                type: string;
                createdAt: Date;
                hashRate: string;
                status: import(".prisma/client").$Enums.Status;
            }[];
        };
        messages: never[];
        statusCode: number;
        time: Date;
    }>;
    updateStatus(userId: string, data: VdcardStatusDto): Promise<{
        data: {
            id: string;
            status: import(".prisma/client").$Enums.Status;
            createdAt: Date;
            userId: string;
            videoCardId: string;
        }[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
}
