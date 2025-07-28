import { UserRole } from '@prisma/client';
export declare class CreateAdminDto {
    name: string;
    surname: string;
    phoneNumber: string;
    email: string;
    password: string;
    role: UserRole;
}
