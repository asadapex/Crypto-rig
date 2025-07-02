import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { Request } from 'express';
import { VdcardStatusDto } from './dto/vdcard-status.dto';
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
    statusUpdate(req: Request, data: VdcardStatusDto): Promise<{
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
