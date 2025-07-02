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
exports.VdcardStatusDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class VdcardStatusDto {
    id;
    status;
}
exports.VdcardStatusDto = VdcardStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'uuid' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], VdcardStatusDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.Status, example: client_1.Status.OFFLINE }),
    (0, class_validator_1.IsEnum)(client_1.Status),
    __metadata("design:type", String)
], VdcardStatusDto.prototype, "status", void 0);
//# sourceMappingURL=vdcard-status.dto.js.map