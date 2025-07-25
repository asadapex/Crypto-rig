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
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthGuard = class AuthGuard {
    jwt;
    prisma;
    constructor(jwt, prisma) {
        this.jwt = jwt;
        this.prisma = prisma;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const token = req.headers.authorization?.split(' ')?.[1];
        if (!token) {
            throw new common_1.UnauthorizedException({
                data: [],
                messages: ['Token not provided'],
                statusCode: 401,
                time: new Date(),
            });
        }
        try {
            const data = this.jwt.verify(token);
            req['user-id'] = data.id;
            req['user-role'] = data.role;
            return true;
        }
        catch (error) {
            if (error != common_1.UnauthorizedException) {
                throw error;
            }
            throw new common_1.UnauthorizedException({
                data: [],
                messages: ['Wrong credentials'],
                statusCode: 401,
                time: new Date(),
            });
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthGuard);
//# sourceMappingURL=jwtauth.guard.js.map