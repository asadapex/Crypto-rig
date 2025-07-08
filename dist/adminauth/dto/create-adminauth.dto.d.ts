import { UserRole } from '@prisma/client';
export declare class CreateAdminDto {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}
