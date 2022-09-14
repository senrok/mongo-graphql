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
exports.AggregateFilterType = exports.SubscriptionFilterType = exports.UpdateFilterType = exports.DeleteFilterType = exports.FilterType = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const upper_case_first_1 = require("upper-case-first");
const common_1 = require("../../common");
const helpers_1 = require("./helpers");
const decorators_1 = require("../../decorators");
const field_comparison_1 = require("../field-comparison");
const decorators_2 = require("../../decorators");
const decorators_3 = require("../../decorators");
const reflector = new common_1.MapReflector('mongodb-query:filter-type');
function getObjectTypeName(DTOClass) {
    return (0, common_1.getGraphqlObjectName)(DTOClass, 'No fields found to create FilterType.');
}
function getOrCreateFilterType(TClass, name, filterableRelations = {}) {
    return reflector.memoize(TClass, name, () => {
        var _a;
        var GraphQLFilter_1;
        const { allowedBooleanExpressions } = (_a = (0, decorators_2.getQueryOptions)(TClass)) !== null && _a !== void 0 ? _a : {};
        const fields = (0, decorators_3.getFilterableFields)(TClass);
        if (!fields.length) {
            throw new Error(`No fields found to create GraphQLFilter for ${TClass.name}`);
        }
        const hasRequiredFilters = fields.some((f) => { var _a; return ((_a = f.advancedOptions) === null || _a === void 0 ? void 0 : _a.filterRequired) === true; });
        const isNotAllowedComparison = (val) => !(0, helpers_1.isInAllowedList)(allowedBooleanExpressions, val);
        let GraphQLFilter = GraphQLFilter_1 = class GraphQLFilter {
        };
        GraphQLFilter.hasRequiredFilters = hasRequiredFilters;
        __decorate([
            (0, class_validator_1.ValidateNested)(),
            (0, decorators_1.SkipIf)(() => isNotAllowedComparison('and'), (0, graphql_1.Field)(() => [GraphQLFilter_1], { nullable: true })),
            (0, class_transformer_1.Type)(() => GraphQLFilter_1),
            __metadata("design:type", Array)
        ], GraphQLFilter.prototype, "_and", void 0);
        __decorate([
            (0, class_validator_1.ValidateNested)(),
            (0, decorators_1.SkipIf)(() => isNotAllowedComparison('or'), (0, graphql_1.Field)(() => [GraphQLFilter_1], { nullable: true })),
            (0, class_transformer_1.Type)(() => GraphQLFilter_1),
            __metadata("design:type", Array)
        ], GraphQLFilter.prototype, "_or", void 0);
        __decorate([
            (0, class_validator_1.ValidateNested)(),
            (0, decorators_1.SkipIf)(() => isNotAllowedComparison('nor'), (0, graphql_1.Field)(() => [GraphQLFilter_1], { nullable: true })),
            (0, class_transformer_1.Type)(() => GraphQLFilter_1),
            __metadata("design:type", Array)
        ], GraphQLFilter.prototype, "_nor", void 0);
        GraphQLFilter = GraphQLFilter_1 = __decorate([
            (0, graphql_1.InputType)(name)
        ], GraphQLFilter);
        const { baseName } = (0, common_1.getDTONames)(TClass);
        fields.forEach(({ propertyName, target, advancedOptions, returnTypeFunc }) => {
            const FC = (0, field_comparison_1.createFilterComparisonType)({
                FieldType: target,
                fieldName: `${baseName}${(0, upper_case_first_1.upperCaseFirst)(propertyName)}`,
                allowedComparisons: advancedOptions === null || advancedOptions === void 0 ? void 0 : advancedOptions.allowedComparisons,
                transform: advancedOptions === null || advancedOptions === void 0 ? void 0 : advancedOptions.transform,
                returnTypeFunc,
            });
            const nullable = (advancedOptions === null || advancedOptions === void 0 ? void 0 : advancedOptions.filterRequired) !== true;
            (0, class_validator_1.ValidateNested)()(GraphQLFilter.prototype, propertyName);
            (0, graphql_1.Field)(() => FC, { nullable })(GraphQLFilter.prototype, propertyName);
            (0, class_transformer_1.Type)(() => FC)(GraphQLFilter.prototype, propertyName);
        });
        Object.keys(filterableRelations).forEach((field) => {
            const FieldType = filterableRelations[field];
            if (FieldType) {
                const FC = getOrCreateFilterType(FieldType, `${name}${getObjectTypeName(FieldType)}Filter`);
                (0, class_validator_1.ValidateNested)()(GraphQLFilter.prototype, field);
                (0, graphql_1.Field)(() => FC, { nullable: true })(GraphQLFilter.prototype, field);
                (0, class_transformer_1.Type)(() => FC)(GraphQLFilter.prototype, field);
            }
        });
        return GraphQLFilter;
    });
}
function FilterType(TClass) {
    return getOrCreateFilterType(TClass, `${getObjectTypeName(TClass)}Filter`);
}
exports.FilterType = FilterType;
function DeleteFilterType(TClass) {
    return getOrCreateFilterType(TClass, `${getObjectTypeName(TClass)}DeleteFilter`);
}
exports.DeleteFilterType = DeleteFilterType;
function UpdateFilterType(TClass) {
    return getOrCreateFilterType(TClass, `${getObjectTypeName(TClass)}UpdateFilter`);
}
exports.UpdateFilterType = UpdateFilterType;
function SubscriptionFilterType(TClass) {
    return getOrCreateFilterType(TClass, `${getObjectTypeName(TClass)}SubscriptionFilter`);
}
exports.SubscriptionFilterType = SubscriptionFilterType;
function AggregateFilterType(TClass) {
    return getOrCreateFilterType(TClass, `${getObjectTypeName(TClass)}AggregateFilter`);
}
exports.AggregateFilterType = AggregateFilterType;
