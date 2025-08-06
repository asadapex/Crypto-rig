import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { VdcardStatusDto } from './dto/vdcard-status.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { CollectUserBalanceDto } from './dto/collect-balance.dto';
import { HttpService } from '@nestjs/axios';
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    private readonly httpService;
    constructor(prisma: PrismaService, jwt: JwtService, httpService: HttpService);
    getBtcToUsdRate(): Promise<number>;
    findUser(email: string): Promise<{
        email: string;
        password: string;
        name: string | null;
        surname: string | null;
        phoneNumber: string | null;
        id: string;
        verified: number;
        monthlyProfit: number;
        balance: number;
        role: import(".prisma/client").$Enums.UserRole;
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
    collectUserBalance(req: Request, data: CollectUserBalanceDto): Promise<{
        data: never[];
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
            balance: number;
            monthlyProfit: number;
            cards: {
                id: string;
                image: string | null;
                type: string;
                createdAt: Date;
                hashRate: string;
                earned: number;
                status: import(".prisma/client").$Enums.Status;
            }[];
        };
        messages: never[];
        statusCode: number;
        time: Date;
    }>;
    withdrawBalance(req: Request, data: WithdrawDto): Promise<{
        data: {
            type: import(".prisma/client").$Enums.WithdrawType;
            description: string | null;
            id: string;
            status: import(".prisma/client").$Enums.WithdrawStatus;
            amount: number;
            paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
            cardNumber: string;
            createdAt: Date;
            userId: string;
            reciept: string;
        }[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
    withdrawRequests(req: Request): Promise<{
        data: {
            type: import(".prisma/client").$Enums.WithdrawType;
            description: string | null;
            id: string;
            status: import(".prisma/client").$Enums.WithdrawStatus;
            amount: number;
            paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
            cardNumber: string;
            createdAt: Date;
            userId: string;
            reciept: string;
        }[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
    updateStatus(userId: string, data: VdcardStatusDto): Promise<{
        data: {
            id: string;
            status: import(".prisma/client").$Enums.Status;
            createdAt: Date;
            userId: string;
            earned: number;
            videoCardId: string;
        }[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
}
