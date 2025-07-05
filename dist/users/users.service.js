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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const client_1 = require("@prisma/client");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
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
            return {
                data: [user],
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
    async findAll() {
        const users = await this.prisma.user.findMany();
        return {
            data: users,
            messages: [],
            statusCode: 200,
            time: new Date(),
        };
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        return {
            data: [user],
            messages: [],
            statusCode: 200,
            time: new Date(),
        };
    }
    async update(id, updateUserDto) {
        const updated = await this.prisma.user.update({
            where: { id },
            data: updateUserDto,
        });
        return updated;
    }
    async remove(id) {
        return `This action removes a #${id} user`;
    }
    async topupBalance(req, data) {
        try {
            if (data.amount <= 0) {
                throw new common_1.BadRequestException({
                    data: [],
                    messages: ['Invalid amount'],
                    statusCode: 400,
                    time: new Date(),
                });
            }
            await this.prisma.withdraw.create({
                data: {
                    amount: data.amount,
                    type: client_1.WithdrawType.TOPUP,
                    paymentMethod: data.paymentMethod,
                    status: client_1.WithdrawStatus.PENDING,
                    userId: req['user-id'],
                },
            });
            return {
                data: [],
                messages: ['Balance top-up request created'],
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
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map