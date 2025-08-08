import { AdminauthService } from './adminauth.service';
import { CreateAdminDto } from './dto/create-adminauth.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Request } from 'express';
import { WithdrawReq } from './dto/withdraw-status.dto';
export declare class AdminauthController {
    private readonly adminauthService;
    constructor(adminauthService: AdminauthService);
    create(createAuthDto: CreateAdminDto): Promise<{
        data: {
            token: string;
        }[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
    login(createAuthDto: LoginAdminDto): Promise<{
        data: {
            token: string;
        }[];
        messages: never[];
        statusCode: number;
        time: Date;
    }>;
    findAll(): Promise<{
        id: string;
        email: string;
        password: string;
        name: string | null;
        surname: string | null;
        phoneNumber: string | null;
        verified: number;
        monthlyProfit: number;
        balance: number;
        role: import(".prisma/client").$Enums.UserRole;
        createdAt: Date;
    }[]>;
    findMe(req: Request): Promise<{
        data: {
            id: string;
            name: string | null;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
        }[];
        messages: never[];
        statusCode: number;
        time: Date;
    }>;
    withdrawReqView(): Promise<{
        data: {
            id: string;
            createdAt: Date;
            userId: string;
            amount: number;
            reciept: string;
            cardNumber: string;
            paymentMethod: import(".prisma/client").$Enums.PaymentMethod;
            type: import(".prisma/client").$Enums.WithdrawType;
            status: import(".prisma/client").$Enums.WithdrawStatus;
            description: string | null;
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
