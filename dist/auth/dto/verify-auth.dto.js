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
exports.VerifyAuthDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class VerifyAuthDto {
    name;
    surname;
    phoneNumber;
}
exports.VerifyAuthDto = VerifyAuthDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'John' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyAuthDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'Doe' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], VerifyAuthDto.prototype, "surname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: '+998901234567' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^\+998\d{9}$/, {
        message: 'phoneNumber must be a valid Uzbekistan number starting with +998',
    }),
    __metadata("design:type", String)
], VerifyAuthDto.prototype, "phoneNumber", void 0);
//# sourceMappingURL=verify-auth.dto.js.map