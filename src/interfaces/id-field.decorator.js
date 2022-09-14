"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIDField = exports.IDField = void 0;
const graphql_1 = require("@nestjs/graphql");
const constants_1 = require("../decorators/constants");
const common_1 = require("../common");
const filterable_field_decorator_1 = require("../decorators/filterable-field.decorator");
const reflector = new common_1.ValueReflector(constants_1.ID_FIELD_KEY);
function IDField(returnTypeFunc, options) {
    return (target, propertyName, descriptor) => {
        reflector.set(target.constructor, {
            propertyName: propertyName.toString(),
            returnTypeFunc,
        });
        const disableFilter = options && 'disableFilter' in options;
        const FieldDecorator = disableFilter ? graphql_1.Field : filterable_field_decorator_1.FilterableField;
        if (descriptor) {
            return FieldDecorator(returnTypeFunc, options)(target, propertyName, descriptor);
        }
        return FieldDecorator(returnTypeFunc, options)(target, propertyName);
    };
}
exports.IDField = IDField;
function getIDField(DTOClass) {
    return reflector.get(DTOClass, true);
}
exports.getIDField = getIDField;
