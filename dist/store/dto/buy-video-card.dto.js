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
exports.BuyVideoCardsDto = exports.BuySingleVideoCardDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_1 = require("@prisma/client");
const class_validator_2 = require("class-validator");
class BuySingleVideoCardDto {
    videoCardId;
    count;
}
exports.BuySingleVideoCardDto = BuySingleVideoCardDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], BuySingleVideoCardDto.prototype, "videoCardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 1 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], BuySingleVideoCardDto.prototype, "count", void 0);
class BuyVideoCardsDto {
    data;
    orderType;
}
exports.BuyVideoCardsDto = BuyVideoCardsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [BuySingleVideoCardDto], example: [
            { videoCardId: 'uuid1', count: 1 },
            { videoCardId: 'uuid2', count: 2 }
        ] }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BuySingleVideoCardDto),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], BuyVideoCardsDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.OrderType, example: client_1.OrderType.USER }),
    (0, class_validator_2.IsEnum)(client_1.OrderType),
    __metadata("design:type", String)
], BuyVideoCardsDto.prototype, "orderType", void 0);
//# sourceMappingURL=buy-video-card.dto.js.map