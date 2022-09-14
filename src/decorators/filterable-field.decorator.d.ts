import { FieldOptions, ReturnTypeFunc } from "@nestjs/graphql";
import { Class } from "../common";
import { FilterComparisonOperators } from "../interfaces";
export declare type FilterableFieldOptions = {
  allowedComparisons?: FilterComparisonOperators<unknown>[];
  filterRequired?: boolean;
  filterOnly?: boolean;
  transform?: ({ value }: { value: any }) => any;
} & FieldOptions;
export interface FilterableFieldDescriptor {
  propertyName: string;
  target: Class<unknown>;
  returnTypeFunc?: ReturnTypeFunc;
  advancedOptions?: FilterableFieldOptions;
}
export declare function FilterableField(): PropertyDecorator & MethodDecorator;
export declare function FilterableField(
<<<<<<< ours
  options: FilterableFieldOptions
): PropertyDecorator & MethodDecorator;
export declare function FilterableField(
  returnTypeFunction?: ReturnTypeFunc,
  options?: FilterableFieldOptions
): PropertyDecorator & MethodDecorator;
export declare function getFilterableFields<DTO>(
  DTOClass: Class<DTO>
=======
  options: FilterableFieldOptions,
): PropertyDecorator & MethodDecorator;
export declare function FilterableField(
  returnTypeFunction?: ReturnTypeFunc,
  options?: FilterableFieldOptions,
): PropertyDecorator & MethodDecorator;
export declare function getFilterableFields<DTO>(
  DTOClass: Class<DTO>,
>>>>>>> theirs
): FilterableFieldDescriptor[];
