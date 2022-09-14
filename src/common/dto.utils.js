"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDTOIdTypeOrDefault = exports.getDTONames = void 0;
const pluralize_1 = require("pluralize");
const upper_case_first_1 = require("upper-case-first");
const lower_case_first_1 = require("lower-case-first");
const graphql_1 = require("@nestjs/graphql");
const external_utils_1 = require("./external.utils");
const id_field_decorator_1 = require("../interfaces/id-field.decorator");
const getDTONames = (DTOClass, opts) => {
    var _a, _b, _c;
    const baseName = (0, upper_case_first_1.upperCaseFirst)((_c = (_a = opts === null || opts === void 0 ? void 0 : opts.dtoName) !== null && _a !== void 0 ? _a : (_b = (0, external_utils_1.findGraphqlObjectMetadata)(DTOClass)) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : DTOClass.name);
    const pluralBaseName = (0, pluralize_1.plural)(baseName);
    const baseNameLower = (0, lower_case_first_1.lowerCaseFirst)(baseName);
    const pluralBaseNameLower = (0, pluralize_1.plural)(baseNameLower);
    return {
        baseName,
        baseNameLower,
        pluralBaseName,
        pluralBaseNameLower,
    };
};
exports.getDTONames = getDTONames;
const getDTOIdTypeOrDefault = (DTOS, defaultType = graphql_1.ID) => {
    var _a, _b;
    const dtoWithIDField = DTOS.find((dto) => !!(0, id_field_decorator_1.getIDField)(dto));
    if (dtoWithIDField) {
        return (_b = (_a = (0, id_field_decorator_1.getIDField)(dtoWithIDField)) === null || _a === void 0 ? void 0 : _a.returnTypeFunc()) !== null && _b !== void 0 ? _b : defaultType;
    }
    return defaultType;
};
exports.getDTOIdTypeOrDefault = getDTOIdTypeOrDefault;
