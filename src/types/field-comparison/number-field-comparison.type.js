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
exports.getOrCreateNumberFieldComparison = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const validators_1 = require("../validators");
let numberFieldComparison;
function getOrCreateNumberFieldComparison() {
    if (numberFieldComparison) {
        return numberFieldComparison;
    }
    let NumberFieldComparison = class NumberFieldComparison {
    };
    __decorate([
        (0, graphql_1.Field)(() => Boolean, { nullable: true }),
        (0, class_validator_1.IsBoolean)(),
        (0, class_validator_1.IsOptional)(),
        __metadata("design:type", Boolean)
    ], NumberFieldComparison.prototype, "_exists", void 0);
    __decorate([
        (0, graphql_1.Field)({ nullable: true }),
        (0, class_validator_1.IsNumber)(),
        (0, validators_1.IsUndefined)(),
        __metadata("design:type", Number)
    ], NumberFieldComparison.prototype, "_eq", void 0);
    __decorate([
        (0, graphql_1.Field)({ nullable: true }),
        (0, class_validator_1.IsNumber)(),
        (0, validators_1.IsUndefined)(),
        __metadata("design:type", Number)
    ], NumberFieldComparison.prototype, "_ne", void 0);
    __decorate([
        (0, graphql_1.Field)({ nullable: true }),
        (0, class_validator_1.IsNumber)(),
        (0, validators_1.IsUndefined)(),
        __metadata("design:type", Number)
    ], NumberFieldComparison.prototype, "_gt", void 0);
    __decorate([
        (0, graphql_1.Field)({ nullable: true }),
        (0, class_validator_1.IsNumber)(),
        (0, validators_1.IsUndefined)(),
        __metadata("design:type", Number)
    ], NumberFieldComparison.prototype, "_gte", void 0);
    __decorate([
        (0, graphql_1.Field)({ nullable: true }),
        (0, class_validator_1.IsNumber)(),
        (0, validators_1.IsUndefined)(),
        __metadata("design:type", Number)
    ], NumberFieldComparison.prototype, "_lt", void 0);
    __decorate([
        (0, graphql_1.Field)({ nullable: true }),
        (0, class_validator_1.IsNumber)(),
        (0, validators_1.IsUndefined)(),
        __metadata("design:type", Number)
    ], NumberFieldComparison.prototype, "_lte", void 0);
    __decorate([
        (0, graphql_1.Field)(() => [Number], { nullable: true }),
        (0, class_validator_1.IsNumber)({}, { each: true }),
        (0, validators_1.IsUndefined)(),
        __metadata("design:type", Array)
    ], NumberFieldComparison.prototype, "_in", void 0);
    __decorate([
        (0, graphql_1.Field)(() => [Number], { nullable: true }),
        (0, class_validator_1.IsNumber)({}, { each: true }),
        (0, validators_1.IsUndefined)(),
        __metadata("design:type", Array)
    ], NumberFieldComparison.prototype, "_nin", void 0);
    __decorate([
        (0, graphql_1.Field)(() => [Number], { nullable: true }),
        (0, class_validator_1.IsNumber)({}, { each: true }),
        (0, validators_1.IsUndefined)(),
        __metadata("design:type", Array)
    ], NumberFieldComparison.prototype, "_all", void 0);
    __decorate([
        (0, graphql_1.Field)(() => Number, { nullable: true }),
        (0, class_validator_1.IsNumber)({}, { each: true }),
        (0, validators_1.IsUndefined)(),
        __metadata("design:type", Number)
    ], NumberFieldComparison.prototype, "_elemMatch", void 0);
    NumberFieldComparison = __decorate([
        (0, graphql_1.InputType)()
    ], NumberFieldComparison);
    numberFieldComparison = NumberFieldComparison;
    return numberFieldComparison;
}
exports.getOrCreateNumberFieldComparison = getOrCreateNumberFieldComparison;
