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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiningService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let MiningService = class MiningService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async resetMonthlyProfit() {
        await this.prisma.user.updateMany({
            data: { monthlyProfit: 0 },
        });
    }
    async handleMining() {
        const userCards = await this.prisma.userVideoCard.findMany({
            where: {
                status: client_1.Status.ACTIVE,
            },
        });
        const updates = userCards.map((card) => this.prisma.userVideoCard.update({
            where: { id: card.id },
            data: {
                earned: {
                    increment: 0.0037,
                },
            },
        }));
        await this.prisma.$transaction(updates);
        console.log(`[MINING] ${userCards.length} ACTIVE cards updated`);
    }
};
exports.MiningService = MiningService;
__decorate([
    (0, schedule_1.Cron)('0 0 1 * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MiningService.prototype, "resetMonthlyProfit", null);
__decorate([
    (0, schedule_1.Cron)('* * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MiningService.prototype, "handleMining", null);
exports.MiningService = MiningService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MiningService);
//# sourceMappingURL=mining.service.js.map