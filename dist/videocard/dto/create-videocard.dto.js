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
exports.CreateVideocardDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateVideocardDto {
    manufacturer;
    model;
    release;
    algorithm;
    hashRate;
    powerEfficiency;
    powerUsage;
    supportedCoins;
    network;
    fans;
    temperature;
    noiseLevel;
    weight;
}
exports.CreateVideocardDto = CreateVideocardDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'Bitmain' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVideocardDto.prototype, "manufacturer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'Antminer S19' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVideocardDto.prototype, "model", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 2020 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateVideocardDto.prototype, "release", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'SHA-256' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVideocardDto.prototype, "algorithm", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: '82TH/s - 95TH/s' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVideocardDto.prototype, "hashRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: '34W per TH' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVideocardDto.prototype, "powerEfficiency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: '2950W - 3250W' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVideocardDto.prototype, "powerUsage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'BTC, BCH, and 70+ SHA-256 coins' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVideocardDto.prototype, "supportedCoins", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'RJ45 Etheret' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVideocardDto.prototype, "network", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 4 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateVideocardDto.prototype, "fans", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: '5°C - 40°C' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVideocardDto.prototype, "temperature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: '75 dB' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVideocardDto.prototype, "noiseLevel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: '17 kg' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVideocardDto.prototype, "weight", void 0);
//# sourceMappingURL=create-videocard.dto.js.map