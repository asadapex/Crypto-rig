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
exports.AdminauthController = void 0;
const common_1 = require("@nestjs/common");
const adminauth_service_1 = require("./adminauth.service");
const create_adminauth_dto_1 = require("./dto/create-adminauth.dto");
const login_admin_dto_1 = require("./dto/login-admin.dto");
const jwtauth_guard_1 = require("../jwtauth/jwtauth.guard");
const withdraw_status_dto_1 = require("./dto/withdraw-status.dto");
let AdminauthController = class AdminauthController {
    adminauthService;
    constructor(adminauthService) {
        this.adminauthService = adminauthService;
    }
    create(createAuthDto) {
        return this.adminauthService.create(createAuthDto);
    }
    login(createAuthDto) {
        return this.adminauthService.login(createAuthDto);
    }
    findAll() {
        return this.adminauthService.findAll();
    }
    findMe(req) {
        return this.adminauthService.findMe(req);
    }
    withdrawReqView() {
        return this.adminauthService.withdrawReqView();
    }
    withdrawReq(data) {
        return this.adminauthService.withdrawReq(data);
    }
    deleteHistory(id) {
        return this.adminauthService.deleteHistory(id);
    }
};
exports.AdminauthController = AdminauthController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_adminauth_dto_1.CreateAdminDto]),
    __metadata("design:returntype", void 0)
], AdminauthController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_admin_dto_1.LoginAdminDto]),
    __metadata("design:returntype", void 0)
], AdminauthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminauthController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwtauth_guard_1.AuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminauthController.prototype, "findMe", null);
__decorate([
    (0, common_1.Get)('withdraw-req'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminauthController.prototype, "withdrawReqView", null);
__decorate([
    (0, common_1.Post)('withdraw-req'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [withdraw_status_dto_1.WithdrawReq]),
    __metadata("design:returntype", void 0)
], AdminauthController.prototype, "withdrawReq", null);
__decorate([
    (0, common_1.Delete)('delete-history:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminauthController.prototype, "deleteHistory", null);
exports.AdminauthController = AdminauthController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [adminauth_service_1.AdminauthService])
], AdminauthController);
//# sourceMappingURL=adminauth.controller.js.map