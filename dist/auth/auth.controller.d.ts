import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { Request } from 'express';
import { VdcardStatusDto } from './dto/vdcard-status.dto';
import { WithdrawDto } from './dto/withdraw.dto';
import { CollectUserBalanceDto } from './dto/collect-balance.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createAuthDto: CreateAuthDto): Promise<{
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
    login(createAuthDto: CreateAuthDto): Promise<{
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
            pendingOrders: {
                id: string;
                productId: string;
                count: number;
                createdAt: Date;
                status: import(".prisma/client").$Enums.OrderStatus;
            }[];
        };
        messages: never[];
        statusCode: number;
        time: Date;
    }>;
    collectVideoCardBalance(req: Request, data: CollectUserBalanceDto): Promise<{
        data: never[];
        messages: string[];
        statusCode: number;
        time: Date;
    } | undefined>;
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
    myWithdraws(req: Request): Promise<{
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
    statusUpdate(req: Request, data: VdcardStatusDto): Promise<{
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
