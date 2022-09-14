import { FieldOptions, ReturnTypeFunc } from "@nestjs/graphql";
import { Class, MetaValue } from "../common";
import { FilterableFieldOptions } from "../decorators/filterable-field.decorator";
declare type NoFilterIDFieldOptions = {
  disableFilter: true;
} & FieldOptions;
export declare type IDFieldOptions =
  | FilterableFieldOptions
  | NoFilterIDFieldOptions;
export interface IDFieldDescriptor {
  propertyName: string;
  returnTypeFunc: ReturnTypeFunc;
}
export declare function IDField(
  returnTypeFunc: ReturnTypeFunc,
<<<<<<< ours
  options?: IDFieldOptions
): PropertyDecorator & MethodDecorator;
export declare function getIDField<DTO>(
  DTOClass: Class<DTO>
=======
  options?: IDFieldOptions,
): PropertyDecorator & MethodDecorator;
export declare function getIDField<DTO>(
  DTOClass: Class<DTO>,
>>>>>>> theirs
): MetaValue<IDFieldDescriptor>;
export {};
