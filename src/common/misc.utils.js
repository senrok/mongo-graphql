"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNamed = void 0;
const isNamed = (SomeType) => 'name' in SomeType && typeof SomeType.name === 'string';
exports.isNamed = isNamed;
