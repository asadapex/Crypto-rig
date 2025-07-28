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
exports.VideocardController = void 0;
const common_1 = require("@nestjs/common");
const videocard_service_1 = require("./videocard.service");
const create_videocard_dto_1 = require("./dto/create-videocard.dto");
const update_videocard_dto_1 = require("./dto/update-videocard.dto");
const jwtauth_guard_1 = require("../jwtauth/jwtauth.guard");
const role_guard_1 = require("../role/role.guard");
const role_decorator_1 = require("../decorators/role-decorator");
const client_1 = require("@prisma/client");
let VideocardController = class VideocardController {
    videocardService;
    constructor(videocardService) {
        this.videocardService = videocardService;
    }
    create(createVideocardDto) {
        return this.videocardService.create(createVideocardDto);
    }
    findAll() {
        return this.videocardService.findAll();
    }
    findOne(id) {
        return this.videocardService.findOne(id);
    }
    update(id, updateVideocardDto) {
        return this.videocardService.update(id, updateVideocardDto);
    }
    remove(id) {
        return this.videocardService.remove(id);
    }
};
exports.VideocardController = VideocardController;
__decorate([
    (0, role_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwtauth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_videocard_dto_1.CreateVideocardDto]),
    __metadata("design:returntype", void 0)
], VideocardController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VideocardController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VideocardController.prototype, "findOne", null);
__decorate([
    (0, role_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwtauth_guard_1.AuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_videocard_dto_1.UpdateVideocardDto]),
    __metadata("design:returntype", void 0)
], VideocardController.prototype, "update", null);
__decorate([
    (0, role_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwtauth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VideocardController.prototype, "remove", null);
exports.VideocardController = VideocardController = __decorate([
    (0, common_1.Controller)('videocard'),
    __metadata("design:paramtypes", [videocard_service_1.VideocardService])
], VideocardController);
//# sourceMappingURL=videocard.controller.js.map