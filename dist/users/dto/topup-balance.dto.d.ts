import { PaymentMethod } from '@prisma/client';
export declare class TopupBalanceDto {
    amount: number;
    reciept: string;
    paymentMethod: PaymentMethod;
}
