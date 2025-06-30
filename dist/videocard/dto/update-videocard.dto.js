"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVideocardDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_videocard_dto_1 = require("./create-videocard.dto");
class UpdateVideocardDto extends (0, swagger_1.PartialType)(create_videocard_dto_1.CreateVideocardDto) {
}
exports.UpdateVideocardDto = UpdateVideocardDto;
//# sourceMappingURL=update-videocard.dto.js.map