import { CreateAdminDto } from './dto/create-adminauth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginAdminDto } from './dto/login-admin.dto';
import { Request } from 'express';
export declare class AdminauthService {
    private readonly prisma;
    private readonly jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
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
