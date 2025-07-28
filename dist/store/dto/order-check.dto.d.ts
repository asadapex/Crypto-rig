import { OrderStatus } from '@prisma/client';
export declare class OrderCheckDto {
    status: OrderStatus;
    description?: string;
}
