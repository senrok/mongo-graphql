import { IsBoolean, IsOptional } from "class-validator";
import { upperCaseFirst } from "upper-case-first";
import {
  Field,
  Float,
  GraphQLISODateTime,
  GraphQLTimestamp,
  ID,
  InputType,
  Int,
  ReturnTypeFunc,
  ReturnTypeFuncValue,
} from "@nestjs/graphql";
import { Transform, Type } from "class-transformer";
import { getOrCreateFloatFieldComparison } from "./float-field-comparison.type";
import { getOrCreateIntFieldComparison } from "./int-field-comparison.type";
import { getOrCreateStringFieldComparison } from "./string-field-comparison.type";
import { getOrCreateBooleanFieldComparison } from "./boolean-field-comparison.type";
import { getOrCreateNumberFieldComparison } from "./number-field-comparison.type";
import { getOrCreateDateFieldComparison } from "./date-field-comparison.type";
import { getOrCreateTimestampFieldComparison } from "./timestamp-field-comparison.type";
import {
  FilterComparisonOperators,
  FilterFieldComparison,
} from "../../interfaces";
import { Class, getGraphqlEnumMetadata, isNamed } from "../../common";
import { isInAllowedList } from "../query";
import { SkipIf } from "../../decorators";
import { IsUndefined } from "../validators";
import { ObjectId } from "mongodb";
import { GraphQLJSONScalar } from "../scalars";


/** @internal */
const filterComparisonMap = new Map<
  string,
  () => Class<FilterFieldComparison<unknown>>
>();
filterComparisonMap.set(
  "StringFilterComparison",
  getOrCreateStringFieldComparison
);
filterComparisonMap.set(
  "NumberFilterComparison",
  getOrCreateNumberFieldComparison
);
filterComparisonMap.set("IntFilterComparison", getOrCreateIntFieldComparison);
filterComparisonMap.set(
  "FloatFilterComparison",
  getOrCreateFloatFieldComparison
);
filterComparisonMap.set(
  "BooleanFilterComparison",
  getOrCreateBooleanFieldComparison
);
filterComparisonMap.set("DateFilterComparison", getOrCreateDateFieldComparison);
filterComparisonMap.set(
  "DateTimeFilterComparison",
  getOrCreateDateFieldComparison
);
filterComparisonMap.set(
  "TimestampFilterComparison",
  getOrCreateTimestampFieldComparison
);

const knownTypes: Set<ReturnTypeFuncValue> = new Set([
  String,
  Number,
  Boolean,
  Int,
  Float,
  ID,
  Date,
  GraphQLISODateTime,
  GraphQLTimestamp,
  GraphQLJSONScalar,
]);

/** @internal */
const getTypeName = (SomeType: ReturnTypeFuncValue): string => {
  if (knownTypes.has(SomeType) || isNamed(SomeType)) {
    const typeName = (SomeType as { name: string }).name;
    return upperCaseFirst(typeName);
  }
  if (typeof SomeType === "object") {
    const enumType = getGraphqlEnumMetadata(SomeType);
    if (enumType) {
      return upperCaseFirst(enumType.name);
    }
  }
  throw new Error(
    `Unable to create filter comparison for ${JSON.stringify(SomeType)}.`
  );
};

const isCustomFieldComparison = <T>(
  options: FilterComparisonOptions<T>
): boolean => !!options.allowedComparisons;

const getComparisonTypeName = <T>(
  fieldType: ReturnTypeFuncValue,
  options: FilterComparisonOptions<T>
): string => {
  if (isCustomFieldComparison(options)) {
    return `${upperCaseFirst(options.fieldName)}FilterComparison`;
  }
  return `${getTypeName(fieldType)}FilterComparison`;
};

type FilterComparisonOptions<T> = {
  FieldType: Class<T>;
  fieldName: string;
  allowedComparisons?: FilterComparisonOperators<T>[];
  returnTypeFunc?: ReturnTypeFunc;
  transform?: ({ value }) => any;
};

const getTypeTransformer = (fieldType: ReturnTypeFuncValue) => {
  if (fieldType == ObjectId) {
    return ({ value }) => {
      return new ObjectId(value);
    };
  }
  return ({ value }) => value;
};

/** @internal */
export function createFilterComparisonType<T>(
  options: FilterComparisonOptions<T>
): Class<FilterFieldComparison<T>> {
  const { FieldType, returnTypeFunc } = options;
  const fieldType = returnTypeFunc ? returnTypeFunc() : FieldType;
  const inputName = getComparisonTypeName(fieldType, options);
  const transform = options?.transform ?? getTypeTransformer(fieldType);
  const generator = filterComparisonMap.get(inputName);
  if (generator) {
    return generator() as Class<FilterFieldComparison<T>>;
  }
  const isNotAllowed = (val: FilterComparisonOperators<unknown>) => () =>
    !isInAllowedList(options.allowedComparisons, val as unknown);

  @InputType(inputName)
  class Fc {
    @SkipIf(isNotAllowed("_exists"), Field(() => Boolean, { nullable: true }))
    @IsBoolean()
    @IsOptional()
    _exists?: boolean;

    @SkipIf(isNotAllowed("_eq"), Field(() => fieldType, { nullable: true }))
    @IsUndefined()
    @Type(() => FieldType)
    @Transform(transform)
    _eq?: T;

    @SkipIf(isNotAllowed("_ne"), Field(() => fieldType, { nullable: true }))
    @IsUndefined()
    @Type(() => FieldType)
    @Transform(transform)
    _ne?: T;

    @SkipIf(isNotAllowed("_gt"), Field(() => fieldType, { nullable: true }))
    @IsUndefined()
    @Type(() => FieldType)
    @Transform(transform)
    _gt?: T;

    @SkipIf(isNotAllowed("_gte"), Field(() => fieldType, { nullable: true }))
    @IsUndefined()
    @Type(() => FieldType)
    @Transform(transform)
    _gte?: T;

    @SkipIf(isNotAllowed("_lt"), Field(() => fieldType, { nullable: true }))
    @IsUndefined()
    @Type(() => FieldType)
    @Transform(transform)
    _lt?: T;

    @SkipIf(isNotAllowed("_lte"), Field(() => fieldType, { nullable: true }))
    @IsUndefined()
    @Type(() => FieldType)
    @Transform(transform)
    _lte?: T;

    @SkipIf(isNotAllowed("_regex"), Field(() => fieldType, { nullable: true }))
    @IsUndefined()
    @Type(() => FieldType)
    @Transform(transform)
    _regex?: T;

    @SkipIf(isNotAllowed("_in"), Field(() => [fieldType], { nullable: true }))
    @IsUndefined()
    @Type(() => FieldType)
    @Transform(transform)
    _in?: T[];

    @SkipIf(isNotAllowed("_nin"), Field(() => [fieldType], { nullable: true }))
    @IsUndefined()
    @Type(() => FieldType)
    @Transform(transform)
    _nin?: T[];

    @SkipIf(isNotAllowed("_all"), Field(() => [fieldType], { nullable: true }))
    @IsUndefined()
    @Type(() => FieldType)
    @Transform(transform)
    _all?: T[];

    @SkipIf(
      isNotAllowed("_elemMatch"),
      Field(() => fieldType, { nullable: true })
    )
    @IsUndefined()
    @Type(() => FieldType)
    @Transform(transform)
    _elemMatch?: T;

    @SkipIf(isNotAllowed("_dot"), Field(() => fieldType, { nullable: true }))
    @IsUndefined()
    @Type(() => FieldType)
    @Transform(transform)
    _dot?: T;
  }

  filterComparisonMap.set(inputName, () => Fc);
  return Fc as Class<FilterFieldComparison<T>>;
}
