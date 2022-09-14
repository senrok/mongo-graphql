"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsUndefined = void 0;
const class_validator_1 = require("class-validator");
function IsUndefined(validationOptions) {
    return (obj, property) => (0, class_validator_1.ValidateIf)((o) => o[property] !== undefined, validationOptions)(obj, property);
}
exports.IsUndefined = IsUndefined;
