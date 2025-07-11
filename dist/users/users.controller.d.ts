import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TopupBalanceDto } from './dto/topup-balance.dto';
import { Request } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        data: {
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
        }[];
        messages: string[];
        statusCode: number;
        time: Date;
    } | undefined>;
    findAll(): Promise<{
        data: {
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
        }[];
        messages: never[];
        statusCode: number;
        time: Date;
    }>;
    findOne(id: string): Promise<{
        data: ({
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
        } | null)[];
        messages: never[];
        statusCode: number;
        time: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        data: {
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
        }[];
        messages: never[];
        statusCode: number;
        time: Date;
    }>;
    remove(id: string): Promise<{
        data: {
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
        }[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
    topupBalance(req: Request, data: TopupBalanceDto): Promise<{
        data: never[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
}
