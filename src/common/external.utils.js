"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGraphqlEnumMetadata = exports.getGraphqlObjectName = exports.getGraphqlObjectMetadata = exports.findGraphqlObjectMetadata = void 0;
const lazy_metadata_storage_1 = require("@nestjs/graphql/dist/schema-builder/storages/lazy-metadata.storage");
const graphql_1 = require("@nestjs/graphql");
const type_errors_1 = require("../types/type.errors");
function findGraphqlObjectMetadata(objType) {
    return graphql_1.TypeMetadataStorage.getObjectTypesMetadata().find((o) => o.target === objType);
}
exports.findGraphqlObjectMetadata = findGraphqlObjectMetadata;
function getGraphqlObjectMetadata(objType, notFoundMsg) {
    const metadata = findGraphqlObjectMetadata(objType);
    if (!metadata) {
        throw new type_errors_1.UnregisteredObjectType(objType, notFoundMsg);
    }
    return metadata;
}
exports.getGraphqlObjectMetadata = getGraphqlObjectMetadata;
function getGraphqlObjectName(DTOClass, notFoundMsg) {
    return getGraphqlObjectMetadata(DTOClass, notFoundMsg).name;
}
exports.getGraphqlObjectName = getGraphqlObjectName;
function getGraphqlEnumMetadata(objType) {
    lazy_metadata_storage_1.LazyMetadataStorage.load();
    return graphql_1.TypeMetadataStorage.getEnumsMetadata().find((o) => o.ref === objType);
}
exports.getGraphqlEnumMetadata = getGraphqlEnumMetadata;
