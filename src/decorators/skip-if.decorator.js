"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipIf = void 0;
const decorator_utils_1 = require("./decorator.utils");
function SkipIf(check, ...decorators) {
    if (check()) {
        return () => { };
    }
    return (0, decorator_utils_1.composeDecorators)(...decorators);
}
exports.SkipIf = SkipIf;
