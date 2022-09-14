"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrototypeChain = void 0;
function getPrototypeChain(Cls) {
    const baseClass = Object.getPrototypeOf(Cls);
    if (baseClass) {
        return [Cls, ...getPrototypeChain(baseClass)];
    }
    return [Cls];
}
exports.getPrototypeChain = getPrototypeChain;
