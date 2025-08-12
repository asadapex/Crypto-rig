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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const client_1 = require("@prisma/client");
const axios_1 = require("@nestjs/axios");
let AuthService = class AuthService {
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
    async findUser(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        return user;
    }
    async create(data) {
        const user = await this.findUser(data.email);
        if (user) {
            throw new common_1.BadRequestException({
                data: [],
                messages: ['User already exists'],
                statusCode: 400,
                time: new Date(),
            });
        }
        try {
            const hash = bcrypt.hashSync(data.password, 10);
            const user = await this.prisma.user.create({
                data: { ...data, password: hash },
            });
            const token = this.jwt.sign({ id: user.id, role: user.role });
            return {
                data: [{ token }],
                messages: ['User registered'],
                statusCode: 200,
                time: new Date(),
            };
        }
        catch (error) {
            if (error != common_1.InternalServerErrorException) {
                throw error;
            }
            console.log(error);
        }
    }
    async verify(req, data) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: req['user-id'] },
            });
            if (!user) {
                throw new common_1.NotFoundException({
                    data: [],
                    messages: ['User not found'],
                    statusCode: 404,
                    time: new Date(),
                });
            }
            if (user.role == client_1.UserRole.ADMIN ||
                user.role == client_1.UserRole.SUPPORT ||
                user.role == client_1.UserRole.VIEWER) {
                throw new common_1.BadRequestException({
                    data: [],
                    messages: ['No need to verify'],
                    statusCode: 400,
                    time: new Date(),
                });
            }
            const { name, surname, phoneNumber } = data;
            if (!name)
                throw new common_1.BadRequestException({
                    data: [],
                    messages: ['Name is required'],
                    statusCode: 400,
                    time: new Date(),
                });
            if (!surname)
                throw new common_1.BadRequestException({
                    data: [],
                    messages: ['Surname is required'],
                    statusCode: 400,
                    time: new Date(),
                });
            if (!phoneNumber)
                throw new common_1.BadRequestException({
                    data: [],
                    messages: ['Phone number is required'],
                    statusCode: 400,
                    time: new Date(),
                });
            await this.prisma.user.update({
                where: { id: req['user-id'] },
                data: { name, surname, phoneNumber, verified: 1 },
            });
            return {
                data: [{ name, surname, phoneNumber }],
                messages: ['User verified'],
                statusCode: 200,
                time: new Date(),
            };
        }
        catch (err) {
            if (err != common_1.InternalServerErrorException) {
                throw err;
            }
            console.log(err);
        }
    }
    async login(data) {
        const user = await this.findUser(data.email);
        if (!user) {
            throw new common_1.NotFoundException({
                data: [],
                messages: ['User not found'],
                statusCode: 404,
                time: new Date(),
            });
        }
        try {
            const match = bcrypt.compareSync(data.password, user.password);
            if (!match) {
                throw new common_1.BadRequestException({
                    data: [],
                    messages: ['Wrong credentials'],
                    statusCode: 400,
                    time: new Date(),
                });
            }
            const token = this.jwt.sign({ id: user.id, role: user.role });
            return {
                data: [{ token }],
                messages: ['User logged in'],
                statusCode: 200,
                time: new Date(),
            };
        }
        catch (error) {
            if (error != common_1.InternalServerErrorException) {
                throw error;
            }
            console.log(error);
        }
    }
    async collectUserBalance(req, data) {
        try {
            const userVideoCard = await this.prisma.userVideoCard.findFirst({
                where: { userId: req['user-id'], id: data.id },
            });
            if (!userVideoCard) {
                throw new common_1.NotFoundException({
                    data: [],
                    messages: ['Not found'],
                    statusCode: 404,
                    time: new Date(),
                });
            }
            if (userVideoCard.earned == 0)
                throw new common_1.BadRequestException({
                    data: [],
                    messages: ['Mining device has not earned yet'],
                    statusCode: 400,
                    time: new Date(),
                });
            const user = await this.prisma.user.findUnique({
                where: { id: req['user-id'] },
            });
            if (!user) {
                throw new common_1.NotFoundException({
                    data: [],
                    messages: ['User not found'],
                    statusCode: 404,
                    time: new Date(),
                });
            }
            await this.prisma.$transaction([
                this.prisma.user.update({
                    where: { id: req['user-id'] },
                    data: { balance: user?.balance + userVideoCard.earned },
                }),
                this.prisma.userVideoCard.update({
                    where: { id: userVideoCard.id },
                    data: { earned: 0 },
                }),
            ]);
            return {
                data: [],
                messages: ['Money collected'],
                statusCode: 200,
                time: new Date(),
            };
        }
        catch (error) {
            if (error != common_1.InternalServerErrorException) {
                throw error;
            }
            console.log(error);
        }
    }
    async findMe(req) {
        const user = await this.prisma.user.findUnique({
            where: { id: req['user-id'] },
            include: {
                cards: {
                    include: {
                        videcard: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException({
                data: [],
                messages: ['User not found'],
                statusCode: 404,
                time: new Date(),
            });
        }
        const orders = await this.prisma.order.findMany({
            where: { userId: req['user-id'] },
            include: {
                items: { include: { videoCard: true } },
            },
        });
        const pendingOrders = await this.prisma.order.findMany({
            where: { userId: req['user-id'], status: client_1.OrderStatus.PENDING },
            include: {
                items: { include: { videoCard: true } },
            },
        });
        const data = {
            name: user.name,
            surname: user.surname,
            phoneNumber: user.phoneNumber,
            email: user.email,
            verified: user.verified,
            balance: user.balance,
            monthlyProfit: user.monthlyProfit,
            cards: user.cards.map((card) => ({
                id: card.id,
                image: card.videcard.image,
                type: `${card.videcard.manufacturer} ${card.videcard.model}`,
                createdAt: card.createdAt,
                hashRate: card.videcard.hashRate,
                earned: card.earned,
                status: card.status,
            })),
            pendingOrders: pendingOrders.flatMap((order) => order.items.map((item) => ({
                orderId: order.id,
                productId: item.videoCardId,
                productName: `${item.videoCard.manufacturer} ${item.videoCard.model}`,
                count: item.count,
                createdAt: order.createdAt,
                status: order.status,
            }))),
        };
        return {
            data,
            messages: [],
            statusCode: 200,
            time: new Date(),
        };
    }
    async withdrawBalance(req, data) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: req['user-id'] },
            });
            if (!user) {
                throw new common_1.NotFoundException({
                    data: [],
                    messages: ['User not found'],
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
            const btcAmount = parseFloat((data.amount / btcToUsdRate).toFixed(8));
            if (user.balance < btcAmount) {
                throw new common_1.BadRequestException({
                    data: [],
                    messages: ['Not enough BTC balance'],
                    statusCode: 400,
                    time: new Date(),
                });
            }
            const withdrawreq = await this.prisma.withdraw.create({
                data: {
                    amount: data.amount,
                    paymentMethod: data.paymentMethod,
                    status: client_1.WithdrawStatus.PENDING,
                    userId: user.id,
                    cardNumber: data.cardNumber,
                    type: client_1.WithdrawType.WITHDRAW,
                },
            });
            return {
                data: [withdrawreq],
                messages: ['Withdraw request created'],
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
    async withdrawRequests(req) {
        try {
            const withdraws = await this.prisma.withdraw.findMany({
                where: { userId: req['user-id'] },
            });
            return {
                data: withdraws,
                messages: [''],
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
    async updateStatus(userId, data) {
        const userCard = await this.prisma.userVideoCard.findUnique({
            where: { id: data.id },
        });
        if (!userCard) {
            throw new common_1.NotFoundException({
                data: [],
                messages: ['Video card not found'],
                statusCode: 404,
                time: new Date(),
            });
        }
        if (userCard.userId !== userId) {
            throw new common_1.ForbiddenException({
                data: [],
                messages: ['You are not allowed to update this card'],
                statusCode: 403,
                time: new Date(),
            });
        }
        const updated = await this.prisma.userVideoCard.update({
            where: { id: data.id },
            data: { status: data.status },
        });
        return {
            data: [updated],
            messages: ['Status changed'],
            statusCode: 200,
            time: new Date(),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        axios_1.HttpService])
], AuthService);
//# sourceMappingURL=auth.service.js.map