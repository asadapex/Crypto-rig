import { CreateAdminDto } from './dto/create-adminauth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Request } from 'express';
import { WithdrawReq } from './dto/withdraw-status.dto';
import { HttpService } from '@nestjs/axios';
export declare class AdminauthService {
    private readonly prisma;
    private readonly jwt;
    private readonly httpService;
    constructor(prisma: PrismaService, jwt: JwtService, httpService: HttpService);
    getBtcToUsdRate(): Promise<number>;
    create(data: CreateAdminDto): Promise<{
        data: {
            token: string;
        }[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
    login(data: LoginAdminDto): Promise<{
        data: {
            token: string;
        }[];
        messages: never[];
        statusCode: number;
        time: Date;
    }>;
    findAll(): Promise<{
        email: string;
        password: string;
        name: string;
        id: string;
        role: import(".prisma/client").$Enums.UserRole;
    }[]>;
    findMe(req: Request): Promise<{
        data: {
            id: string;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
        }[];
        messages: never[];
        statusCode: number;
        time: Date;
    }>;
    withdrawReqView(): Promise<{
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
        }[][];
        messages: never[];
        statusCode: number;
        time: Date;
    }>;
    withdrawReq(data: WithdrawReq): Promise<{
        data: never[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
    deleteHistory(id: string): Promise<{
        data: never[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
}
