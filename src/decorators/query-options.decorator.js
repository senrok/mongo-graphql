"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryOptions = exports.QueryOptions = void 0;
const constants_1 = require("./constants");
const common_1 = require("../common");
const valueReflector = new common_1.ValueReflector(constants_1.QUERY_OPTIONS_KEY);
function QueryOptions(opts) {
    return (target) => {
        valueReflector.set(target, opts);
    };
}
exports.QueryOptions = QueryOptions;
const getQueryOptions = (DTOClass) => valueReflector.get(DTOClass);
exports.getQueryOptions = getQueryOptions;
