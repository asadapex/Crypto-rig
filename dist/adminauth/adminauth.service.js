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
exports.AdminauthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
const axios_1 = require("@nestjs/axios");
let AdminauthService = class AdminauthService {
    prisma;
    jwt;
    httpService;
    constructor(prisma, jwt, httpService) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.httpService = httpService;
    }
    async getBtcToUsdRate() {
        const url = 'https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT';
        const response = await this.httpService.axiosRef.get(url);
        return parseFloat(response.data.price);
    }
    async create(data) {
        try {
            const admin = await this.prisma.user.findUnique({
                where: { email: data.email },
            });
            if (admin) {
                throw new common_1.BadRequestException({
                    data: [],
                    messages: ['Admin already exists'],
                    statusCode: 400,
                    time: new Date(),
                });
            }
            const hash = bcrypt.hashSync(data.password, 10);
            const newAdmin = await this.prisma.user.create({
                data: { ...data, password: hash, verified: 1 },
            });
            const token = this.jwt.sign({ id: newAdmin.id, role: data.role });
            return {
                data: [{ token }],
                messages: ['Admin registered'],
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
    async login(data) {
        try {
            const admin = await this.prisma.user.findUnique({
                where: { email: data.email },
            });
            if (!admin) {
                throw new common_1.NotFoundException({
                    data: [],
                    messages: ['Admin not found'],
                    statusCode: 404,
                    time: new Date(),
                });
            }
            const match = bcrypt.compareSync(data.password, admin.password);
            if (!match)
                throw new common_1.BadRequestException({
                    data: [],
                    messages: ['Wrong credentials'],
                    statusCode: 400,
                    time: new Date(),
                });
            const token = this.jwt.sign({ id: admin.id, role: admin.role });
            return {
                data: [{ token }],
                messages: [],
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
    async findAll() {
        const all = await this.prisma.admin.findMany();
        return all;
    }
    async findMe(req) {
        try {
            const admin = await this.prisma.admin.findUnique({
                where: { id: req['user-id'] },
            });
            if (!admin) {
                throw new common_1.NotFoundException({
                    data: [],
                    messages: ['Admin not found'],
                    statusCode: 404,
                    time: new Date(),
                });
            }
            return {
                data: [
                    {
                        id: admin.id,
                        name: admin.name,
                        email: admin.email,
                        role: admin.role,
                    },
                ],
                messages: [],
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
    async withdrawReqView() {
        try {
            const all = await this.prisma.withdraw.findMany();
            return {
                data: [all],
                messages: [],
                statusCode: 200,
                time: new Date(),
            };
        }
        catch (error) {
            if (error != common_1.InternalServerErrorException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException({ message: 'Server error' });
        }
    }
    async withdrawReq(data) {
        try {
            const withdraw = await this.prisma.withdraw.findUnique({
                where: { id: data.id },
            });
            if (!withdraw) {
                throw new common_1.NotFoundException({
                    data: [],
                    messages: ['Withdraw request not found'],
                    statusCode: 404,
                    time: new Date(),
                });
            }
            if (data.status === client_1.WithdrawStatus.ACCEPTED) {
                const btcToUsdRate = await this.getBtcToUsdRate();
                if (!btcToUsdRate || isNaN(btcToUsdRate)) {
                    throw new common_1.InternalServerErrorException({
                        message: 'Unable to fetch BTC rate',
                    });
                }
                const btcAmount = parseFloat((withdraw.amount / btcToUsdRate).toFixed(8));
                const updateBalance = withdraw.type === client_1.WithdrawType.TOPUP
                    ? { increment: btcAmount }
                    : { decrement: btcAmount };
                await this.prisma.user.update({
                    where: { id: withdraw.userId },
                    data: {
                        balance: updateBalance,
                    },
                });
            }
            await this.prisma.withdraw.update({
                where: { id: data.id },
                data,
            });
            return {
                data: [],
                messages: ['Withdraw request updated'],
                statusCode: 200,
                time: new Date(),
            };
        }
        catch (error) {
            if (error != common_1.InternalServerErrorException) {
                throw error;
            }
            console.error(error);
            throw new common_1.InternalServerErrorException({ message: 'Server error' });
        }
    }
    async deleteHistory(id) {
        try {
            const withdraw = await this.prisma.withdraw.findUnique({
                where: { id },
            });
            if (!withdraw) {
                throw new common_1.NotFoundException({
                    data: [],
                    messages: ['Withdraw request not found'],
                    statusCode: 404,
                    time: new Date(),
                });
            }
            await this.prisma.withdraw.delete({
                where: { id },
            });
            return {
                data: [],
                messages: ['Withdraw request deleted'],
                statusCode: 200,
                time: new Date(),
            };
        }
        catch (error) {
            if (error != common_1.InternalServerErrorException) {
                throw error;
            }
            console.error(error);
            throw new common_1.InternalServerErrorException({ message: 'Server error' });
        }
    }
};
exports.AdminauthService = AdminauthService;
exports.AdminauthService = AdminauthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        axios_1.HttpService])
], AdminauthService);
//# sourceMappingURL=adminauth.service.js.map