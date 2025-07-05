import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { VdcardStatusDto } from './dto/vdcard-status.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { CollectUserBalanceDto } from './dto/collect-balance.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    findUser(email: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string | null;
        surname: string | null;
        phoneNumber: string | null;
        verified: number;
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
            id: string;
            userId: string;
            status: import(".prisma/client").$Enums.WithdrawStatus;
            amount: number;
            paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
            type: import(".prisma/client").$Enums.WithdrawType;
        }[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
    withdrawRequests(req: Request): Promise<{
        data: {
            id: string;
            userId: string;
            status: import(".prisma/client").$Enums.WithdrawStatus;
            amount: number;
            paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
            type: import(".prisma/client").$Enums.WithdrawType;
        }[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
    updateStatus(userId: string, data: VdcardStatusDto): Promise<{
        data: {
            id: string;
            createdAt: Date;
            userId: string;
            status: import(".prisma/client").$Enums.Status;
            earned: number;
            videoCardId: string;
        }[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
}
