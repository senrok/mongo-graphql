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
exports.createFilterComparisonType = void 0;
const class_validator_1 = require("class-validator");
const upper_case_first_1 = require("upper-case-first");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const float_field_comparison_type_1 = require("./float-field-comparison.type");
const int_field_comparison_type_1 = require("./int-field-comparison.type");
const string_field_comparison_type_1 = require("./string-field-comparison.type");
const boolean_field_comparison_type_1 = require("./boolean-field-comparison.type");
const number_field_comparison_type_1 = require("./number-field-comparison.type");
const date_field_comparison_type_1 = require("./date-field-comparison.type");
const timestamp_field_comparison_type_1 = require("./timestamp-field-comparison.type");
const common_1 = require("../../common");
const query_1 = require("../query");
const decorators_1 = require("../../decorators");
const validators_1 = require("../validators");
const mongodb_1 = require("mongodb");
const graphql_type_json_1 = require("graphql-type-json");
const filterComparisonMap = new Map();
filterComparisonMap.set('StringFilterComparison', string_field_comparison_type_1.getOrCreateStringFieldComparison);
filterComparisonMap.set('NumberFilterComparison', number_field_comparison_type_1.getOrCreateNumberFieldComparison);
filterComparisonMap.set('IntFilterComparison', int_field_comparison_type_1.getOrCreateIntFieldComparison);
filterComparisonMap.set('FloatFilterComparison', float_field_comparison_type_1.getOrCreateFloatFieldComparison);
filterComparisonMap.set('BooleanFilterComparison', boolean_field_comparison_type_1.getOrCreateBooleanFieldComparison);
filterComparisonMap.set('DateFilterComparison', date_field_comparison_type_1.getOrCreateDateFieldComparison);
filterComparisonMap.set('DateTimeFilterComparison', date_field_comparison_type_1.getOrCreateDateFieldComparison);
filterComparisonMap.set('TimestampFilterComparison', timestamp_field_comparison_type_1.getOrCreateTimestampFieldComparison);
const knownTypes = new Set([
    String,
    Number,
    Boolean,
    graphql_1.Int,
    graphql_1.Float,
    graphql_1.ID,
    Date,
    graphql_1.GraphQLISODateTime,
    graphql_1.GraphQLTimestamp,
    graphql_type_json_1.GraphQLJSONObject,
]);
const getTypeName = (SomeType) => {
    if (knownTypes.has(SomeType) || (0, common_1.isNamed)(SomeType)) {
        const typeName = SomeType.name;
        return (0, upper_case_first_1.upperCaseFirst)(typeName);
    }
    if (typeof SomeType === 'object') {
        const enumType = (0, common_1.getGraphqlEnumMetadata)(SomeType);
        if (enumType) {
            return (0, upper_case_first_1.upperCaseFirst)(enumType.name);
        }
    }
    throw new Error(`Unable to create filter comparison for ${JSON.stringify(SomeType)}.`);
};
const isCustomFieldComparison = (options) => !!options.allowedComparisons;
const getComparisonTypeName = (fieldType, options) => {
    if (isCustomFieldComparison(options)) {
        return `${(0, upper_case_first_1.upperCaseFirst)(options.fieldName)}FilterComparison`;
    }
    return `${getTypeName(fieldType)}FilterComparison`;
};
const getTypeTransformer = (fieldType) => {
    if (fieldType == mongodb_1.ObjectId) {
        return ({ value }) => {
            return new mongodb_1.ObjectId(value);
        };
    }
    return ({ value }) => value;
};
function createFilterComparisonType(options) {
    var _a;
    const { FieldType, returnTypeFunc } = options;
    const fieldType = returnTypeFunc ? returnTypeFunc() : FieldType;
    const inputName = getComparisonTypeName(fieldType, options);
    const transform = (_a = options === null || options === void 0 ? void 0 : options.transform) !== null && _a !== void 0 ? _a : getTypeTransformer(fieldType);
    const generator = filterComparisonMap.get(inputName);
    if (generator) {
        return generator();
    }
    const isNotAllowed = (val) => () => !(0, query_1.isInAllowedList)(options.allowedComparisons, val);
    let Fc = class Fc {
    };
    __decorate([
        (0, decorators_1.SkipIf)(isNotAllowed('_exists'), (0, graphql_1.Field)(() => Boolean, { nullable: true })),
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Boolean)
    ], Fc.prototype, "_exists", void 0);
    __decorate([
        (0, decorators_1.SkipIf)(isNotAllowed('_eq'), (0, graphql_1.Field)(() => fieldType, { nullable: true })),
        (0, validators_1.IsUndefined)(),
        (0, class_transformer_1.Type)(() => FieldType),
        (0, class_transformer_1.Transform)(transform),
        __metadata("design:type", Object)
    ], Fc.prototype, "_eq", void 0);
    __decorate([
        (0, decorators_1.SkipIf)(isNotAllowed('_ne'), (0, graphql_1.Field)(() => fieldType, { nullable: true })),
        (0, validators_1.IsUndefined)(),
        (0, class_transformer_1.Type)(() => FieldType),
        (0, class_transformer_1.Transform)(transform),
        __metadata("design:type", Object)
    ], Fc.prototype, "_ne", void 0);
    __decorate([
        (0, decorators_1.SkipIf)(isNotAllowed('_gt'), (0, graphql_1.Field)(() => fieldType, { nullable: true })),
        (0, validators_1.IsUndefined)(),
        (0, class_transformer_1.Type)(() => FieldType),
        (0, class_transformer_1.Transform)(transform),
        __metadata("design:type", Object)
    ], Fc.prototype, "_gt", void 0);
    __decorate([
        (0, decorators_1.SkipIf)(isNotAllowed('_gte'), (0, graphql_1.Field)(() => fieldType, { nullable: true })),
        (0, validators_1.IsUndefined)(),
        (0, class_transformer_1.Type)(() => FieldType),
        (0, class_transformer_1.Transform)(transform),
        __metadata("design:type", Object)
    ], Fc.prototype, "_gte", void 0);
    __decorate([
        (0, decorators_1.SkipIf)(isNotAllowed('_lt'), (0, graphql_1.Field)(() => fieldType, { nullable: true })),
        (0, validators_1.IsUndefined)(),
        (0, class_transformer_1.Type)(() => FieldType),
        (0, class_transformer_1.Transform)(transform),
        __metadata("design:type", Object)
    ], Fc.prototype, "_lt", void 0);
    __decorate([
        (0, decorators_1.SkipIf)(isNotAllowed('_lte'), (0, graphql_1.Field)(() => fieldType, { nullable: true })),
        (0, validators_1.IsUndefined)(),
        (0, class_transformer_1.Type)(() => FieldType),
        (0, class_transformer_1.Transform)(transform),
        __metadata("design:type", Object)
    ], Fc.prototype, "_lte", void 0);
    __decorate([
        (0, decorators_1.SkipIf)(isNotAllowed('_regex'), (0, graphql_1.Field)(() => fieldType, { nullable: true })),
        (0, validators_1.IsUndefined)(),
        (0, class_transformer_1.Type)(() => FieldType),
        (0, class_transformer_1.Transform)(transform),
        __metadata("design:type", Object)
    ], Fc.prototype, "_regex", void 0);
    __decorate([
        (0, decorators_1.SkipIf)(isNotAllowed('_in'), (0, graphql_1.Field)(() => [fieldType], { nullable: true })),
        (0, validators_1.IsUndefined)(),
        (0, class_transformer_1.Type)(() => FieldType),
        (0, class_transformer_1.Transform)(transform),
        __metadata("design:type", Array)
    ], Fc.prototype, "_in", void 0);
    __decorate([
        (0, decorators_1.SkipIf)(isNotAllowed('_nin'), (0, graphql_1.Field)(() => [fieldType], { nullable: true })),
        (0, validators_1.IsUndefined)(),
        (0, class_transformer_1.Type)(() => FieldType),
        (0, class_transformer_1.Transform)(transform),
        __metadata("design:type", Array)
    ], Fc.prototype, "_nin", void 0);
    __decorate([
        (0, decorators_1.SkipIf)(isNotAllowed('_all'), (0, graphql_1.Field)(() => [fieldType], { nullable: true })),
        (0, validators_1.IsUndefined)(),
        (0, class_transformer_1.Type)(() => FieldType),
        (0, class_transformer_1.Transform)(transform),
        __metadata("design:type", Array)
    ], Fc.prototype, "_all", void 0);
    __decorate([
        (0, decorators_1.SkipIf)(isNotAllowed('_elemMatch'), (0, graphql_1.Field)(() => fieldType, { nullable: true })),
        (0, validators_1.IsUndefined)(),
        (0, class_transformer_1.Type)(() => FieldType),
        (0, class_transformer_1.Transform)(transform),
        __metadata("design:type", Object)
    ], Fc.prototype, "_elemMatch", void 0);
    __decorate([
        (0, decorators_1.SkipIf)(isNotAllowed('_dot'), (0, graphql_1.Field)(() => fieldType, { nullable: true })),
        (0, validators_1.IsUndefined)(),
        (0, class_transformer_1.Type)(() => FieldType),
        (0, class_transformer_1.Transform)(transform),
        __metadata("design:type", Object)
    ], Fc.prototype, "_dot", void 0);
    Fc = __decorate([
        (0, graphql_1.InputType)(inputName)
    ], Fc);
    filterComparisonMap.set(inputName, () => Fc);
    return Fc;
}
exports.createFilterComparisonType = createFilterComparisonType;
