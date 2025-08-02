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
    async buyCards(userId, data) {
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
        const vdcard = await this.prisma.videoCard.findUnique({
            where: { id: data.videoCardId },
        });
        if (!vdcard) {
            throw new common_1.NotFoundException({
                data: [],
                messages: ['Video Card not found'],
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
        const btcAmount = parseFloat((vdcard.price / btcToUsdRate).toFixed(8));
        if (btcAmount > user.balance) {
            throw new common_1.BadRequestException({
                data: [],
                messages: ['Not enough balance'],
                statusCode: 400,
                time: new Date(),
            });
        }
        await this.prisma.order.create({
            data: {
                userId,
                videoCardId: data.videoCardId,
                count: data.count,
                status: client_1.OrderStatus.PENDING,
            },
        });
        return {
            data: [],
            messages: ['Order created'],
            statusCode: 200,
            time: new Date(),
        };
    }
    async orderPatch(data) {
        try {
            const one = await this.prisma.order.findUnique({
                where: { id: data.id },
            });
            if (!one) {
                throw new common_1.NotFoundException({
                    data: [],
                    messages: ['Order not found'],
                    statusCode: 404,
                    time: new Date(),
                });
            }
            await this.prisma.order.update({
                where: { id: data.id },
                data: { read: data.read },
            });
            return {
                data: [],
                messages: ['Order updated'],
                statusCode: 200,
                time: new Date(),
            };
        }
        catch (error) {
            if (error != common_1.InternalServerErrorException) {
                throw error;
            }
            console.log(error);
            throw new common_1.InternalServerErrorException({ message: 'Server error' });
        }
    }
    async myOrders(userId) {
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
        const all = await this.prisma.order.findMany({
            where: {
                userId,
                NOT: {
                    status: client_1.OrderStatus.ACCEPTED,
                },
            },
            include: { videoCard: true },
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
            const order = await this.prisma.order.findUnique({ where: { id } });
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
                    data: { status: data.status },
                });
                const vdcard = await this.prisma.videoCard.findUnique({
                    where: { id: order.videoCardId },
                });
                if (!vdcard) {
                    throw new common_1.NotFoundException({
                        data: [],
                        messages: ['Video Card not found'],
                        statusCode: 404,
                        time: new Date(),
                    });
                }
                for (let i = 0; i < order.count; i++) {
                    await this.prisma.userVideoCard.create({
                        data: {
                            userId: order.userId,
                            videoCardId: order.videoCardId,
                        },
                    });
                }
                const btcToUsdRate = await this.getBtcToUsdRate();
                if (!btcToUsdRate || isNaN(btcToUsdRate)) {
                    throw new common_1.InternalServerErrorException({
                        message: 'Unable to fetch BTC rate',
                    });
                }
                const btcAmount = parseFloat((vdcard.price / btcToUsdRate).toFixed(8));
                await this.prisma.user.update({
                    where: { id: order.userId },
                    data: { balance: { decrement: btcAmount } },
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
                    data: { status: data.status, description: data.description },
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
};
exports.StoreService = StoreService;
exports.StoreService = StoreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        axios_1.HttpService])
], StoreService);
//# sourceMappingURL=store.service.js.map