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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const create_auth_dto_1 = require("./dto/create-auth.dto");
const verify_auth_dto_1 = require("./dto/verify-auth.dto");
const jwtauth_guard_1 = require("../jwtauth/jwtauth.guard");
const vdcard_status_dto_1 = require("./dto/vdcard-status.dto");
const withdraw_dto_1 = require("./dto/withdraw.dto");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    create(createAuthDto) {
        return this.authService.create(createAuthDto);
    }
    verify(req, data) {
        return this.authService.verify(req, data);
    }
    login(createAuthDto) {
        return this.authService.login(createAuthDto);
    }
    findMe(req) {
        return this.authService.findMe(req);
    }
    withdrawBalance(req, data) {
        return this.authService.withdrawBalance(req, data);
    }
    myWithdraws(req) {
        return this.authService.withdrawRequests(req);
    }
    statusUpdate(req, data) {
        const userId = req['user-id'];
        return this.authService.updateStatus(userId, data);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.CreateAuthDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwtauth_guard_1.AuthGuard),
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, verify_auth_dto_1.VerifyAuthDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "verify", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.CreateAuthDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwtauth_guard_1.AuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "findMe", null);
__decorate([
    (0, common_1.UseGuards)(jwtauth_guard_1.AuthGuard),
    (0, common_1.Post)('withdraw-request'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, withdraw_dto_1.WithdrawDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "withdrawBalance", null);
__decorate([
    (0, common_1.UseGuards)(jwtauth_guard_1.AuthGuard),
    (0, common_1.Get)('my-withdraw'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "myWithdraws", null);
__decorate([
    (0, common_1.UseGuards)(jwtauth_guard_1.AuthGuard),
    (0, common_1.Post)('status-change'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, vdcard_status_dto_1.VdcardStatusDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "statusUpdate", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map