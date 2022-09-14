import { Field, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { upperCaseFirst } from "upper-case-first";
import {
  Class,
  getDTONames,
  getGraphqlObjectName,
  MapReflector,
} from "../../common";
import { isInAllowedList } from "./helpers";
import { Filter } from "../../interfaces";
import { SkipIf } from "../../decorators";
import { createFilterComparisonType } from "../field-comparison";
import { getQueryOptions } from "../../decorators";
import { getFilterableFields } from "../../decorators";

const reflector = new MapReflector("mongodb-query:filter-type");

export type FilterTypeOptions = {
  allowedBooleanExpressions?: ("and" | "or" | "nor")[];
};
export type FilterableRelations = Record<string, Class<unknown>>;

export interface FilterConstructor<T> {
  hasRequiredFilters: boolean;

  new (): Filter<T>;
}

function getObjectTypeName<DTO>(DTOClass: Class<DTO>): string {
  return getGraphqlObjectName(
    DTOClass,
    "No fields found to create FilterType."
  );
}

function getOrCreateFilterType<T>(
  TClass: Class<T>,
  name: string,
  filterableRelations: FilterableRelations = {}
): FilterConstructor<T> {
  return reflector.memoize(TClass, name, () => {
    const { allowedBooleanExpressions }: FilterTypeOptions =
      getQueryOptions(TClass) ?? {};
    const fields = getFilterableFields(TClass);
    if (!fields.length) {
      throw new Error(
        `No fields found to create GraphQLFilter for ${TClass.name}`
      );
    }
    const hasRequiredFilters = fields.some(
      (f) => f.advancedOptions?.filterRequired === true
    );
    const isNotAllowedComparison = (val: "and" | "or" | "nor") =>
      !isInAllowedList(allowedBooleanExpressions, val);

    @InputType(name)
    class GraphQLFilter {
      static hasRequiredFilters: boolean = hasRequiredFilters;

      @ValidateNested()
      @SkipIf(
        () => isNotAllowedComparison("and"),
        Field(() => [GraphQLFilter], { nullable: true })
      )
      @Type(() => GraphQLFilter)
      _and?: Filter<T>[];

      @ValidateNested()
      @SkipIf(
        () => isNotAllowedComparison("or"),
        Field(() => [GraphQLFilter], { nullable: true })
      )
      @Type(() => GraphQLFilter)
      _or?: Filter<T>[];

      @ValidateNested()
      @SkipIf(
        () => isNotAllowedComparison("nor"),
        Field(() => [GraphQLFilter], { nullable: true })
      )
      @Type(() => GraphQLFilter)
      _nor?: Filter<T>[];
    }

    const { baseName } = getDTONames(TClass);
    fields.forEach(
      ({ propertyName, target, advancedOptions, returnTypeFunc }) => {
        const FC = createFilterComparisonType({
          FieldType: target,
          fieldName: `${baseName}${upperCaseFirst(propertyName)}`,
          allowedComparisons: advancedOptions?.allowedComparisons,
          transform: advancedOptions?.transform,
          returnTypeFunc,
        });
        const nullable = advancedOptions?.filterRequired !== true;
        ValidateNested()(GraphQLFilter.prototype, propertyName);
        Field(() => FC, { nullable })(GraphQLFilter.prototype, propertyName);
        Type(() => FC)(GraphQLFilter.prototype, propertyName);
      }
    );
    Object.keys(filterableRelations).forEach((field) => {
      const FieldType = filterableRelations[field];
      if (FieldType) {
        const FC = getOrCreateFilterType(
          FieldType,
          `${name}${getObjectTypeName(FieldType)}Filter`
        );
        ValidateNested()(GraphQLFilter.prototype, field);
        Field(() => FC, { nullable: true })(GraphQLFilter.prototype, field);
        Type(() => FC)(GraphQLFilter.prototype, field);
      }
    });
    return GraphQLFilter as FilterConstructor<T>;
  });
}

export function FilterType<T>(TClass: Class<T>): FilterConstructor<T> {
  return getOrCreateFilterType(TClass, `${getObjectTypeName(TClass)}Filter`);
}

export function DeleteFilterType<T>(TClass: Class<T>): FilterConstructor<T> {
  return getOrCreateFilterType(
    TClass,
    `${getObjectTypeName(TClass)}DeleteFilter`
  );
}

export function UpdateFilterType<T>(TClass: Class<T>): FilterConstructor<T> {
  return getOrCreateFilterType(
    TClass,
    `${getObjectTypeName(TClass)}UpdateFilter`
  );
}

export function SubscriptionFilterType<T>(
  TClass: Class<T>
): FilterConstructor<T> {
  return getOrCreateFilterType(
    TClass,
    `${getObjectTypeName(TClass)}SubscriptionFilter`
  );
}

export function AggregateFilterType<T>(TClass: Class<T>): FilterConstructor<T> {
  return getOrCreateFilterType(
    TClass,
    `${getObjectTypeName(TClass)}AggregateFilter`
  );
}
