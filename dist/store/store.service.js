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
const client_1 = require("@prisma/client");
const axios_1 = require("@nestjs/axios");
let StoreService = class StoreService {
    prisma;
    httpService;
    constructor(prisma, httpService) {
        this.prisma = prisma;
        this.httpService = httpService;
    }
    async getBtcToUsdRate() {
        const url = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT';
        const response = await this.httpService.axiosRef.get(url);
        return parseFloat(response.data.price);
    }
    async buyCards(userId, dto, req) {
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
        const videoCardIds = dto.data.map(item => item.videoCardId);
        const videoCards = await this.prisma.videoCard.findMany({
            where: { id: { in: videoCardIds } },
        });
        if (videoCards.length !== videoCardIds.length) {
            const foundIds = videoCards.map(vc => vc.id);
            const notFoundIds = videoCardIds.filter(id => !foundIds.includes(id));
            throw new common_1.NotFoundException({
                data: [],
                messages: [`Video Cards not found: ${notFoundIds.join(', ')}`],
                statusCode: 404,
                time: new Date(),
            });
        }
        const btcToUsdRate = await this.getBtcToUsdRate();
        if (!btcToUsdRate || isNaN(btcToUsdRate)) {
            throw new common_1.InternalServerErrorException({
                message: 'Unable to fetch BTC rate',
            });
        }
        let totalBtcRequired = 0;
        for (const item of dto.data) {
            const card = videoCards.find(vc => vc.id === item.videoCardId);
            const btcAmount = parseFloat((card.price / btcToUsdRate).toFixed(8));
            totalBtcRequired += btcAmount * item.count;
        }
        if (totalBtcRequired > user.balance) {
            throw new common_1.BadRequestException({
                data: [],
                messages: ['Not enough balance'],
                statusCode: 400,
                time: new Date(),
            });
        }
        const creator = await this.prisma.user.findUnique({ where: { id: req['user-id'] } });
        const order = await this.prisma.order.create({
            data: {
                userId,
                status: client_1.OrderStatus.PENDING,
                createdBy: creator?.email,
                orderType: dto.orderType,
            },
        });
        const orderItems = await this.prisma.orderItems.createMany({
            data: dto.data.map(item => ({
                orderId: order.id,
                videoCardId: item.videoCardId,
                count: item.count,
            })),
        });
        return {
            data: { order, orderItems },
            messages: ['Order created with items'],
            statusCode: 200,
            time: new Date(),
        };
    }
    async orders() {
        const all = await this.prisma.order.findMany({
            include: { items: { include: { videoCard: true } }, user: { select: { id: true, email: true, role: true } } },
        });
        return {
            data: all,
            messages: [],
            statusCode: 200,
            time: new Date(),
        };
    }
    async checkOrder(id, data) {
        try {
            const order = await this.prisma.order.findUnique({
                where: { id },
                include: { items: { include: { videoCard: true } }, user: { select: { id: true, email: true, role: true } } },
            });
            if (!order) {
                throw new common_1.NotFoundException({
                    data: [],
                    messages: ['Order not found'],
                    statusCode: 404,
                    time: new Date(),
                });
            }
            if (data.status === client_1.OrderStatus.ACCEPTED) {
                await this.prisma.order.update({
                    where: { id },
                    data: { status: client_1.OrderStatus.ACCEPTED, read: data.read },
                });
                const btcToUsdRate = await this.getBtcToUsdRate();
                if (!btcToUsdRate || isNaN(btcToUsdRate)) {
                    throw new common_1.InternalServerErrorException({
                        message: 'Unable to fetch BTC rate',
                    });
                }
                let totalBtc = 0;
                for (const item of order.items) {
                    const vdcard = await this.prisma.videoCard.findUnique({
                        where: { id: item.videoCardId },
                    });
                    if (!vdcard) {
                        throw new common_1.NotFoundException({
                            data: [],
                            messages: [`Video Card not found: ${item.videoCardId}`],
                            statusCode: 404,
                            time: new Date(),
                        });
                    }
                    for (let i = 0; i < item.count; i++) {
                        await this.prisma.userVideoCard.create({
                            data: {
                                userId: order.userId,
                                videoCardId: item.videoCardId,
                            },
                        });
                    }
                    const btcAmount = parseFloat((vdcard.price / btcToUsdRate).toFixed(8));
                    totalBtc += btcAmount * item.count;
                }
                await this.prisma.user.update({
                    where: { id: order.userId },
                    data: { balance: { decrement: totalBtc } },
                });
                return {
                    data: [],
                    messages: ['Order accepted'],
                    statusCode: 200,
                    time: new Date(),
                };
            }
            if (data.status === client_1.OrderStatus.REJECTED) {
                await this.prisma.order.update({
                    where: { id },
                    data: { status: client_1.OrderStatus.REJECTED, description: data.description, read: data.read },
                });
                return {
                    data: [],
                    messages: ['Order rejected'],
                    statusCode: 200,
                    time: new Date(),
                };
            }
            throw new common_1.BadRequestException({
                data: [],
                messages: ['Wrong status'],
                statusCode: 400,
                time: new Date(),
            });
        }
        catch (error) {
            if (error != common_1.InternalServerErrorException) {
                throw error;
            }
            console.log(error);
            throw new common_1.InternalServerErrorException({ message: 'Server error' });
        }
    }
    async deleteAll() {
        await this.prisma.orderItems.deleteMany({});
        await this.prisma.order.deleteMany({});
        return {
            data: [],
            messages: ['All orders deleted successfully'],
            statusCode: 200,
            time: new Date(),
        };
    }
};
exports.StoreService = StoreService;
exports.StoreService = StoreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        axios_1.HttpService])
], StoreService);
//# sourceMappingURL=store.service.js.map