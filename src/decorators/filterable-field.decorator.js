"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilterableFields = exports.FilterableField = void 0;
const graphql_1 = require("@nestjs/graphql");
const constants_1 = require("./constants");
const common_1 = require("../common");
const reflector = new common_1.ArrayReflector(constants_1.FILTERABLE_FIELD_KEY);
function FilterableField(returnTypeFuncOrOptions, maybeOptions) {
    let returnTypeFunc;
    let advancedOptions;
    if (typeof returnTypeFuncOrOptions === 'function') {
        returnTypeFunc = returnTypeFuncOrOptions;
        advancedOptions = maybeOptions;
    }
    else if (typeof returnTypeFuncOrOptions === 'object') {
        advancedOptions = returnTypeFuncOrOptions;
    }
    else if (typeof maybeOptions === 'object') {
        advancedOptions = maybeOptions;
    }
    return (target, propertyName, descriptor) => {
        const Ctx = Reflect.getMetadata('design:type', target, propertyName);
        reflector.append(target.constructor, {
            propertyName: propertyName.toString(),
            target: Ctx,
            returnTypeFunc,
            advancedOptions,
        });
        if (advancedOptions === null || advancedOptions === void 0 ? void 0 : advancedOptions.filterOnly) {
            return undefined;
        }
        if (returnTypeFunc) {
            return (0, graphql_1.Field)(returnTypeFunc, advancedOptions)(target, propertyName, descriptor);
        }
        if (advancedOptions) {
            return (0, graphql_1.Field)(advancedOptions)(target, propertyName, descriptor);
        }
        return (0, graphql_1.Field)()(target, propertyName, descriptor);
    };
}
exports.FilterableField = FilterableField;
function getFilterableFields(DTOClass) {
    return (0, common_1.getPrototypeChain)(DTOClass).reduce((fields, Cls) => {
        var _a;
        const existingFieldNames = fields.map((t) => t.propertyName);
        const typeFields = (_a = reflector.get(Cls)) !== null && _a !== void 0 ? _a : [];
        const newFields = typeFields.filter((t) => !existingFieldNames.includes(t.propertyName));
        return [...newFields, ...fields];
    }, []);
}
exports.getFilterableFields = getFilterableFields;
