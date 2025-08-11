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
