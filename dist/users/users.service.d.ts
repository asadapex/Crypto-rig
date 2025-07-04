import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { TopupBalanceDto } from './dto/topup-balance.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findUser(email: string): Promise<{
        email: string;
        password: string;
        name: string | null;
        surname: string | null;
        phoneNumber: string | null;
        id: string;
        verified: number;
        monthlyProfit: number;
        balance: number;
        createdAt: Date;
    } | null>;
    create(data: CreateUserDto): Promise<{
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
            createdAt: Date;
        } | null)[];
        messages: never[];
        statusCode: number;
        time: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        email: string;
        password: string;
        name: string | null;
        surname: string | null;
        phoneNumber: string | null;
        id: string;
        verified: number;
        monthlyProfit: number;
        balance: number;
        createdAt: Date;
    }>;
    remove(id: string): Promise<string>;
    topupBalance(req: Request, data: TopupBalanceDto): Promise<{
        data: never[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
}
