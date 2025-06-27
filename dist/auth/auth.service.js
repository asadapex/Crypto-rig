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
const client_1 = require("@prisma/client");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    prisma;
    jwt;
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
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
                data: { ...data, password: hash, status: client_1.UserStatus.ACTIVE },
            });
            const token = this.jwt.sign({ id: user.id });
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
            const token = this.jwt.sign({ id: user.id });
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
    async findMe(req) {
        const user = await this.prisma.user.findUnique({
            where: { id: req['user-id'] },
            include: {
                cards: true,
            },
        });
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
        const data = {
            name: user.name,
            surname: user.surname,
            phoneNumber: user.phoneNumber,
            email: user.email,
            btc: user.btc,
            monthlyProfit: user.monthlyProfit,
            cards: user.cards.map((card) => ({
                type: card.type,
                createdAt: card.createdAt,
            })),
        };
        return {
            data,
            messages: ['User data fetched successfully'],
            statusCode: 200,
            time: new Date(),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map