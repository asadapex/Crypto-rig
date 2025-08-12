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
exports.OrderCreateDto = void 0;
const class_validator_1 = require("class-validator");
const buy_video_card_dto_1 = require("./buy-video-card.dto");
const swagger_1 = require("@nestjs/swagger");
class OrderCreateDto extends buy_video_card_dto_1.BuyVideoCardsDto {
    userId;
}
exports.OrderCreateDto = OrderCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], OrderCreateDto.prototype, "userId", void 0);
//# sourceMappingURL=order-create-dto.js.map