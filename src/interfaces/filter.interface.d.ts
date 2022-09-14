import { FilterFieldComparison } from "./filter-field-comparison.interface";
export declare type FilterComparisons<T> = {
  [K in keyof T]?: FilterFieldComparison<T[K]>;
};
declare type FilterGrouping<T> = {
  _and?: Filter<T>[];
  _or?: Filter<T>[];
  _nor?: Filter<T>[];
};
export declare type Filter<T> = FilterGrouping<T> & FilterComparisons<T>;
export {};
