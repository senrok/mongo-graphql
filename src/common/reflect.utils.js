"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapReflector = exports.ArrayReflector = exports.ValueReflector = exports.getClassMetadata = exports.classMetadataDecorator = void 0;
require("reflect-metadata");
const classMetadataDecorator = (key) => (data) => (target) => {
    Reflect.defineMetadata(key, data, target);
};
exports.classMetadataDecorator = classMetadataDecorator;
function getClassMetadata(DTOClass, key, includeParents) {
    if (includeParents) {
        return Reflect.getMetadata(key, DTOClass);
    }
    return Reflect.getOwnMetadata(key, DTOClass);
}
exports.getClassMetadata = getClassMetadata;
class Reflector {
    constructor(metaKey) {
        this.metaKey = metaKey;
    }
    getMetadata(target, includeParents) {
        if (includeParents) {
            return Reflect.getMetadata(this.metaKey, target);
        }
        return Reflect.getOwnMetadata(this.metaKey, target);
    }
    defineMetadata(data, target) {
        Reflect.defineMetadata(this.metaKey, data, target);
    }
}
class ValueReflector extends Reflector {
    set(DTOClass, data) {
        this.defineMetadata(data, DTOClass);
    }
    get(DTOClass, includeParents = false) {
        return this.getMetadata(DTOClass, includeParents);
    }
    isDefined(DTOClass) {
        return this.get(DTOClass) !== undefined;
    }
    memoize(DTOClass, fn) {
        const existing = this.get(DTOClass);
        if (existing) {
            return existing;
        }
        const result = fn();
        this.set(DTOClass, result);
        return result;
    }
}
exports.ValueReflector = ValueReflector;
class ArrayReflector extends Reflector {
    append(DTOClass, data) {
        var _a;
        const metadata = (_a = getClassMetadata(DTOClass, this.metaKey, false)) !== null && _a !== void 0 ? _a : [];
        metadata.push(data);
        this.defineMetadata(metadata, DTOClass);
    }
    get(DTOClass, includeParents = false) {
        return this.getMetadata(DTOClass, includeParents);
    }
}
exports.ArrayReflector = ArrayReflector;
class MapReflector extends Reflector {
    set(DTOClass, key, value) {
        var _a;
        const metadata = (_a = getClassMetadata(DTOClass, this.metaKey, false)) !== null && _a !== void 0 ? _a : new Map();
        metadata.set(key, value);
        this.defineMetadata(metadata, DTOClass);
    }
    get(DTOClass, key, includeParents) {
        var _a;
        if (typeof key === 'boolean' || typeof key === 'undefined') {
            return this.getMetadata(DTOClass, includeParents !== null && includeParents !== void 0 ? includeParents : false);
        }
        return (_a = this.getMetadata(DTOClass, includeParents !== null && includeParents !== void 0 ? includeParents : false)) === null || _a === void 0 ? void 0 : _a.get(key);
    }
    getValues(DTOClass, includeParents = false) {
        var _a;
        const values = (_a = this.getMetadata(DTOClass, includeParents)) === null || _a === void 0 ? void 0 : _a.values();
        return values ? [...values] : undefined;
    }
    has(DTOClass, key) {
        var _a, _b;
        return ((_b = (_a = this.getMetadata(DTOClass, false)) === null || _a === void 0 ? void 0 : _a.has(key)) !== null && _b !== void 0 ? _b : false);
    }
    memoize(DTOClass, key, fn) {
        const existing = this.get(DTOClass, key);
        if (existing) {
            return existing;
        }
        const result = fn();
        this.set(DTOClass, key, result);
        return result;
    }
}
exports.MapReflector = MapReflector;
