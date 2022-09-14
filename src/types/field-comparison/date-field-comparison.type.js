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
exports.getOrCreateDateFieldComparison = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const validators_1 = require("../validators");
let dateFieldComparison;
function getOrCreateDateFieldComparison() {
    if (dateFieldComparison) {
        return dateFieldComparison;
    }
    let DateFieldComparison = class DateFieldComparison {
    };
    __decorate([
        (0, graphql_1.Field)(() => Boolean, { nullable: true }),
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Boolean)
    ], DateFieldComparison.prototype, "_exists", void 0);
    __decorate([
        (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.IsDate)(),
        __metadata("design:type", Date)
    ], DateFieldComparison.prototype, "_eq", void 0);
    __decorate([
        (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.IsDate)(),
        __metadata("design:type", Date)
    ], DateFieldComparison.prototype, "_ne", void 0);
    __decorate([
        (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.IsDate)(),
        __metadata("design:type", Date)
    ], DateFieldComparison.prototype, "_gt", void 0);
    __decorate([
        (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.IsDate)(),
        __metadata("design:type", Date)
    ], DateFieldComparison.prototype, "_gte", void 0);
    __decorate([
        (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.IsDate)(),
        __metadata("design:type", Date)
    ], DateFieldComparison.prototype, "_lt", void 0);
    __decorate([
        (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.IsDate)(),
        __metadata("design:type", Date)
    ], DateFieldComparison.prototype, "_lte", void 0);
    __decorate([
        (0, graphql_1.Field)(() => [graphql_1.GraphQLISODateTime], { nullable: true }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.IsDate)({ each: true }),
        __metadata("design:type", Array)
    ], DateFieldComparison.prototype, "_in", void 0);
    __decorate([
        (0, graphql_1.Field)(() => [graphql_1.GraphQLISODateTime], { nullable: true }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.IsDate)({ each: true }),
        __metadata("design:type", Array)
    ], DateFieldComparison.prototype, "_nin", void 0);
    __decorate([
        (0, graphql_1.Field)(() => [graphql_1.GraphQLISODateTime], { nullable: true }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.IsDate)({ each: true }),
        __metadata("design:type", Array)
    ], DateFieldComparison.prototype, "_all", void 0);
    __decorate([
        (0, graphql_1.Field)(() => graphql_1.GraphQLISODateTime, { nullable: true }),
        (0, validators_1.IsUndefined)(),
        (0, class_validator_1.IsDate)({ each: true }),
        __metadata("design:type", Date)
    ], DateFieldComparison.prototype, "_elemMatch", void 0);
    DateFieldComparison = __decorate([
        (0, graphql_1.InputType)('DateFieldComparison')
    ], DateFieldComparison);
    dateFieldComparison = DateFieldComparison;
    return dateFieldComparison;
}
exports.getOrCreateDateFieldComparison = getOrCreateDateFieldComparison;
