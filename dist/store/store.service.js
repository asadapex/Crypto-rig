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
exports.StoreService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let StoreService = class StoreService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async buyCards(userId, dtos) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException({
                data: [],
                messages: ['User not found'],
                statusCode: 404,
                time: new Date(),
            });
        if (user.verified === 0) {
            throw new common_1.BadRequestException({
                data: [],
                messages: ['User has not verified'],
                statusCode: 400,
                time: new Date(),
            });
        }
        for (const dto of dtos) {
            const videoCard = await this.prisma.videoCard.findUnique({
                where: {
                    id: dto.type,
                },
            });
            if (!videoCard) {
                throw new common_1.NotFoundException({
                    data: [],
                    messages: [`Video card not found: ${dto.type}`],
                    statusCode: 404,
                    time: new Date(),
                });
            }
            const createManyData = Array.from({ length: dto.count }).map(() => ({
                userId,
                videoCardId: videoCard.id,
            }));
            await this.prisma.userVideoCard.createMany({
                data: createManyData,
            });
        }
        return {
            data: [],
            messages: ['Video cards added'],
            statusCode: 200,
            time: new Date(),
        };
    }
};
exports.StoreService = StoreService;
exports.StoreService = StoreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StoreService);
//# sourceMappingURL=store.service.js.map