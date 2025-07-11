import { UserRole } from '@prisma/client';
export declare class UpdateUserDto {
    email?: string;
    password?: string;
    name?: string;
    surname?: string;
    phoneNumber?: string;
    verified?: 0 | 1;
    monthlyProfit?: number;
    balance?: number;
    role?: UserRole;
}
