"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const exceljs_1 = require("exceljs");
const swagger_1 = require("@nestjs/swagger");
let ReportsController = class ReportsController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async exportMonthlyProfits(startYear, startMonth, endYear, endMonth, res) {
        if (!startYear || !startMonth || !endYear || !endMonth) {
            throw new common_1.BadRequestException('Missing required query parameters');
        }
        const startDate = new Date(Number(startYear), Number(startMonth) - 1, 1);
        const endDate = new Date(Number(endYear), Number(endMonth), 0, 23, 59, 59);
        const data = await this.prisma.monthlyProfits.findMany({
            where: {
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            include: {
                user: true,
            },
            orderBy: {
                date: 'asc',
            },
        });
        const workbook = new exceljs_1.Workbook();
        const worksheet = workbook.addWorksheet('Monthly Profits');
        worksheet.columns = [
            { header: 'User ID', key: 'userId', width: 36 },
            { header: 'Name', key: 'name', width: 20 },
            { header: 'Email', key: 'email', width: 25 },
            { header: 'Phone', key: 'phone', width: 15 },
            { header: 'Date', key: 'date', width: 15 },
            { header: 'Profit', key: 'profit', width: 15 },
        ];
        for (const record of data) {
            worksheet.addRow({
                userId: record.user.id,
                name: `${record.user.name || ''} ${record.user.surname || ''}`,
                email: record.user.email,
                phone: record.user.phoneNumber,
                date: record.date.toISOString().split('T')[0],
                profit: record.profit,
            });
        }
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=monthly-profits-${startYear}-${startMonth}-to-${endYear}-${endMonth}.xlsx`);
        await workbook.xlsx.write(res);
        res.end();
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('monthly-profits'),
    (0, swagger_1.ApiOperation)({ summary: 'Export monthly profits to Excel' }),
    (0, swagger_1.ApiQuery)({ name: 'startYear', required: true, example: '2025' }),
    (0, swagger_1.ApiQuery)({ name: 'startMonth', required: true, example: '1' }),
    (0, swagger_1.ApiQuery)({ name: 'endYear', required: true, example: '2025' }),
    (0, swagger_1.ApiQuery)({ name: 'endMonth', required: true, example: '8' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'It will return the excel file of monthly profits',
        content: {
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
                schema: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    __param(0, (0, common_1.Query)('startYear')),
    __param(1, (0, common_1.Query)('startMonth')),
    __param(2, (0, common_1.Query)('endYear')),
    __param(3, (0, common_1.Query)('endMonth')),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "exportMonthlyProfits", null);
exports.ReportsController = ReportsController = __decorate([
    (0, swagger_1.ApiTags)('Reports'),
    (0, common_1.Controller)('reports'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map