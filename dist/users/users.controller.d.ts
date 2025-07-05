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
            id: string;
            email: string;
            password: string;
            name: string | null;
            surname: string | null;
            phoneNumber: string | null;
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
            id: string;
            email: string;
            password: string;
            name: string | null;
            surname: string | null;
            phoneNumber: string | null;
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
            id: string;
            email: string;
            password: string;
            name: string | null;
            surname: string | null;
            phoneNumber: string | null;
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
        id: string;
        email: string;
        password: string;
        name: string | null;
        surname: string | null;
        phoneNumber: string | null;
        verified: number;
        monthlyProfit: number;
        balance: number;
        createdAt: Date;
    }>;
    topupBalance(req: Request, data: TopupBalanceDto): Promise<{
        data: never[];
        messages: string[];
        statusCode: number;
        time: Date;
    }>;
    remove(id: string): Promise<string>;
}
