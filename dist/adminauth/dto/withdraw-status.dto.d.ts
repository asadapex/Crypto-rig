import { WithdrawStatus } from '@prisma/client';
export declare class WithdrawReq {
    id: string;
    status: WithdrawStatus;
    description?: string;
}
