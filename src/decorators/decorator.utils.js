"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeDecorators = void 0;
function composeDecorators(...decorators) {
    return (target, propertyKey, descriptorOrIndex) => {
        decorators.forEach((decorator) => {
            if (target instanceof Function && !descriptorOrIndex) {
                return decorator(target);
            }
            if (typeof descriptorOrIndex === 'number') {
                return decorator(target, propertyKey, descriptorOrIndex);
            }
            return decorator(target, propertyKey, descriptorOrIndex);
        });
    };
}
exports.composeDecorators = composeDecorators;
