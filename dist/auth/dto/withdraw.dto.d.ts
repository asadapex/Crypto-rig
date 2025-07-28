import { PaymentMethod } from '@prisma/client';
export declare class WithdrawDto {
    amount: number;
    paymentMethod: PaymentMethod;
    cardNumber: string;
}
