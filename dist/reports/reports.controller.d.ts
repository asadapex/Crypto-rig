import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class ReportsController {
    private prisma;
    constructor(prisma: PrismaService);
    exportMonthlyProfits(startYear: string, startMonth: string, endYear: string, endMonth: string, res: Response): Promise<void>;
}
