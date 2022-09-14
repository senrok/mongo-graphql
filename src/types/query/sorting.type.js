"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrCreateSortType = exports.SortArgs = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const common_1 = require("../../common");
const interfaces_1 = require("../../interfaces");
const decorators_1 = require("../../decorators");
(0, graphql_1.registerEnumType)(interfaces_1.SortDirection, {
    name: 'SortDirection',
    description: 'Sort Directions',
});
const reflector = new common_1.ValueReflector('mongodb-query:sort-type');
function SortArgs(TClass) {
    return getOrCreateSortType(TClass);
}
exports.SortArgs = SortArgs;
function getOrCreateSortType(TClass) {
    return reflector.memoize(TClass, () => {
        const prefix = (0, common_1.getGraphqlObjectName)(TClass, 'Unable to make SortType.');
        const fields = (0, decorators_1.getFilterableFields)(TClass);
        if (!fields.length) {
            throw new Error(`No fields found to create SortType for ${TClass.name}. Ensure fields are annotated with @FilterableField`);
        }
        const fieldNames = fields.map((f) => f.propertyName);
        const fieldNameMap = fieldNames.reduce((acc, f) => (Object.assign(Object.assign({}, acc), { [f]: f })), {});
        (0, graphql_1.registerEnumType)(fieldNameMap, { name: `${prefix}SortFields` });
        let Sort = class Sort {
        };
        __decorate([
            (0, graphql_1.Field)(() => fieldNameMap),
            (0, class_validator_1.IsIn)(fieldNames),
            __metadata("design:type", Object)
        ], Sort.prototype, "field", void 0);
        __decorate([
            (0, graphql_1.Field)(() => interfaces_1.SortDirection),
            (0, class_validator_1.IsEnum)(interfaces_1.SortDirection),
            __metadata("design:type", String)
        ], Sort.prototype, "direction", void 0);
        Sort = __decorate([
            (0, graphql_1.InputType)(`${prefix}Sort`)
        ], Sort);
        return Sort;
    });
}
exports.getOrCreateSortType = getOrCreateSortType;
