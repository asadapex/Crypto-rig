import { AdminauthService } from './adminauth.service';
import { CreateAdminDto } from './dto/create-adminauth.dto';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Request } from 'express';
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
}
