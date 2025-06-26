import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { VerifyAuthDto } from './dto/verify-auth.dto';
import { Request } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    create(createAuthDto: CreateAuthDto): Promise<{
        token: string;
    } | undefined>;
    verify(req: Request, data: VerifyAuthDto): Promise<{
        message: string;
    } | undefined>;
    login(createAuthDto: CreateAuthDto): Promise<{
        token: string;
    } | undefined>;
    findMe(req: Request): Promise<{
        name: string | null;
        surname: string | null;
        phoneNumber: string | null;
        email: string;
        btc: number;
        monthlyProfit: number;
        cards: {
            type: import(".prisma/client").$Enums.VideoCardType;
            createdAt: Date;
        }[];
    }>;
}
