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
exports.StatsController = void 0;
const common_1 = require("@nestjs/common");
const stats_service_1 = require("./stats.service");
const calculate_investment_dto_1 = require("./calculate-investment.dto");
let StatsController = class StatsController {
    statsService;
    constructor(statsService) {
        this.statsService = statsService;
    }
    async getSummary() {
        return this.statsService.getSummary();
    }
    async getTopUsers() {
        return this.statsService.getTopUsersByProfit();
    }
    async getProductStats() {
        return this.statsService.getProductStats();
    }
    async getCharts(from, to) {
        const fromDate = from ? new Date(from) : undefined;
        const toDate = to ? new Date(to) : undefined;
        return this.statsService.getCharts(fromDate, toDate);
    }
    async calculate(dto) {
        return this.statsService.calculateInvestment(dto);
    }
};
exports.StatsController = StatsController;
__decorate([
    (0, common_1.Get)('summary'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Get)('top-users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "getTopUsers", null);
__decorate([
    (0, common_1.Get)('product-stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "getProductStats", null);
__decorate([
    (0, common_1.Get)('charts'),
    __param(0, (0, common_1.Query)('from')),
    __param(1, (0, common_1.Query)('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "getCharts", null);
__decorate([
    (0, common_1.Post)('calculate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calculate_investment_dto_1.CalculateInvestmentDto]),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "calculate", null);
exports.StatsController = StatsController = __decorate([
    (0, common_1.Controller)('admin/analytics'),
    __metadata("design:paramtypes", [stats_service_1.StatsService])
], StatsController);
//# sourceMappingURL=stats.controller.js.map