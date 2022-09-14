"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInAllowedList = void 0;
const isInAllowedList = (arr, val) => { var _a; return (_a = arr === null || arr === void 0 ? void 0 : arr.includes(val)) !== null && _a !== void 0 ? _a : true; };
exports.isInAllowedList = isInAllowedList;
