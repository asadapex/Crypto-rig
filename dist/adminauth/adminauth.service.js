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
let AdminauthService = class AdminauthService {
    prisma;
    jwt;
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async create(data) {
        try {
            const admin = await this.prisma.admin.findUnique({
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
            const newAdmin = await this.prisma.admin.create({
                data: { ...data, password: hash },
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
            const admin = await this.prisma.admin.findUnique({
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
};
exports.AdminauthService = AdminauthService;
exports.AdminauthService = AdminauthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AdminauthService);
//# sourceMappingURL=adminauth.service.js.map