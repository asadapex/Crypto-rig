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
exports.StoreController = void 0;
const common_1 = require("@nestjs/common");
const store_service_1 = require("./store.service");
const buy_video_card_dto_1 = require("./dto/buy-video-card.dto");
const jwtauth_guard_1 = require("../jwtauth/jwtauth.guard");
const role_guard_1 = require("../role/role.guard");
const role_decorator_1 = require("../decorators/role-decorator");
const client_1 = require("@prisma/client");
const order_check_dto_1 = require("./dto/order-check.dto");
const order_read_dto_1 = require("./dto/order-read.dto");
const order_create_dto_1 = require("./dto/order-create-dto");
let StoreController = class StoreController {
    storeService;
    constructor(storeService) {
        this.storeService = storeService;
    }
    async buy(req, data) {
        const userId = req['user-id'];
        return this.storeService.buyCards(userId, data);
    }
    async orderPatch(data, id) {
        return this.storeService.orderPatch(data, id);
    }
    async myOrders(req) {
        const userId = req['user-id'];
        return this.storeService.myOrders(userId);
    }
    async adminOrder(data) {
        return this.storeService.buyCards(data.userId, data);
    }
    async checkOrder(id, data) {
        return this.storeService.checkOrder(id, data);
    }
};
exports.StoreController = StoreController;
__decorate([
    (0, common_1.UseGuards)(jwtauth_guard_1.AuthGuard),
    (0, common_1.Post)('order'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, buy_video_card_dto_1.BuyVideoCardsDto]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "buy", null);
__decorate([
    (0, common_1.UseGuards)(jwtauth_guard_1.AuthGuard),
    (0, common_1.Patch)('order/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_read_dto_1.OrderReadDto, String]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "orderPatch", null);
__decorate([
    (0, common_1.UseGuards)(jwtauth_guard_1.AuthGuard),
    (0, common_1.Get)('order'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "myOrders", null);
__decorate([
    (0, role_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwtauth_guard_1.AuthGuard),
    (0, common_1.Post)('admin/order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_create_dto_1.OrderCreateDto]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "adminOrder", null);
__decorate([
    (0, role_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, common_1.UseGuards)(jwtauth_guard_1.AuthGuard),
    (0, common_1.Patch)('admin/order/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, order_check_dto_1.OrderCheckDto]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "checkOrder", null);
exports.StoreController = StoreController = __decorate([
    (0, common_1.Controller)('store'),
    __metadata("design:paramtypes", [store_service_1.StoreService])
], StoreController);
//# sourceMappingURL=store.controller.js.map