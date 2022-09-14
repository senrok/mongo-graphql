import { Field, InputType, registerEnumType } from "@nestjs/graphql";
import { IsEnum, IsIn } from "class-validator";
import { Class, getGraphqlObjectName, ValueReflector } from "../../common";
import { SortDirection, SortField } from "../../interfaces";
import { getFilterableFields } from "../../decorators";

registerEnumType(SortDirection, {
  name: "SortDirection", // this one is mandatory
  description: "Sort Directions", // this one is optional
});

const reflector = new ValueReflector("mongodb-query:sort-type");

export function SortArgs<T>(TClass: Class<T>): Class<SortField<T>> {
  return getOrCreateSortType(TClass);
}

export function getOrCreateSortType<T>(TClass: Class<T>): Class<SortField<T>> {
  return reflector.memoize(TClass, () => {
    const prefix = getGraphqlObjectName(TClass, "Unable to make SortType.");
    const fields = getFilterableFields(TClass);
    if (!fields.length) {
      throw new Error(
        `No fields found to create SortType for ${TClass.name}. Ensure fields are annotated with @FilterableField`
      );
    }
    const fieldNames = fields.map((f) => f.propertyName);
    const fieldNameMap = fieldNames.reduce(
      (acc, f) => ({ ...acc, [f]: f }),
      {}
    );
    registerEnumType(fieldNameMap, { name: `${prefix}SortFields` });

    @InputType(`${prefix}Sort`)
    class Sort {
      @Field(() => fieldNameMap)
      @IsIn(fieldNames)
      field!: keyof T;

      @Field(() => SortDirection)
      @IsEnum(SortDirection)
      direction!: SortDirection;
    }

    return Sort;
  });
}
