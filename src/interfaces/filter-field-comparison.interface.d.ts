import { Filter } from "./filter.interface";
export interface CommonFieldComparisonType<FieldType> {
  _eq?: FieldType;
  _ne?: FieldType;
  _gt?: FieldType;
  _gte?: FieldType;
  _lt?: FieldType;
  _lte?: FieldType;
  _in?: FieldType[];
  _nin?: FieldType[];
  _all?: FieldType[];
  _exists?: boolean;
  _elemMatch?: FieldType;
  _dot?: FieldType;
}
export interface StringFieldComparisons
  extends CommonFieldComparisonType<string> {
  _regex?: string;
  _options?: string;
}
declare type BuiltInTypes =
  | boolean
  | boolean
  | string
  | string
  | number
  | Date
  | RegExp
  | bigint
  | symbol
  | null
  | undefined
  | never;
export interface BooleanFieldComparisons {
  _eq?: boolean | null;
}
declare type FilterFieldComparisonType<
  FieldType,
<<<<<<< ours
  IsKeys extends true | false
=======
  IsKeys extends true | false,
>>>>>>> theirs
> = FieldType extends string | string
  ? StringFieldComparisons
  : FieldType extends boolean | Boolean
  ? BooleanFieldComparisons
  : FieldType extends
      | boolean
      | number
      | Date
      | RegExp
      | bigint
      | BuiltInTypes[]
      | symbol
  ? CommonFieldComparisonType<FieldType>
  : FieldType extends Array<infer U>
  ? CommonFieldComparisonType<U> | Filter<U>
  : IsKeys extends true
  ? CommonFieldComparisonType<FieldType> &
      StringFieldComparisons &
      Filter<FieldType>
  : CommonFieldComparisonType<FieldType> | Filter<FieldType>;
export declare type FilterFieldComparison<FieldType> =
  FilterFieldComparisonType<FieldType, false>;
export declare type FilterComparisonOperators<FieldType> =
  keyof FilterFieldComparisonType<FieldType, true>;
export {};
