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
exports.VideocardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let VideocardService = class VideocardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        try {
            const newCard = await this.prisma.videoCard.create({ data });
            return {
                data: [newCard],
                messages: ['Video Card created'],
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
        try {
            const data = await this.prisma.videoCard.findMany();
            return {
                data,
                messages: ['Video Cards fetched'],
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
    async findOne(id) {
        try {
            const one = await this.prisma.videoCard.findUnique({ where: { id } });
            if (!one) {
                throw new common_1.NotFoundException({
                    data: [],
                    messages: ['Video Card not found'],
                    statusCode: 404,
                    time: new Date(),
                });
            }
            return {
                data: [one],
                messages: ['Video Card fetched'],
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
    async update(id, data) {
        try {
            const one = await this.prisma.videoCard.findUnique({ where: { id } });
            if (!one) {
                throw new common_1.NotFoundException({
                    data: [],
                    messages: ['Video Card not found'],
                    statusCode: 404,
                    time: new Date(),
                });
            }
            const updated = await this.prisma.videoCard.update({
                where: { id },
                data,
            });
            return {
                data: [updated],
                messages: ['Video Card updated'],
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
    async remove(id) {
        try {
            const one = await this.prisma.videoCard.findUnique({ where: { id } });
            if (!one) {
                throw new common_1.NotFoundException({
                    data: [],
                    messages: ['Video Card not found'],
                    statusCode: 404,
                    time: new Date(),
                });
            }
            const deleted = await this.prisma.videoCard.delete({ where: { id } });
            return {
                data: [deleted],
                messages: ['Video Card deleted'],
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
exports.VideocardService = VideocardService;
exports.VideocardService = VideocardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VideocardService);
//# sourceMappingURL=videocard.service.js.map