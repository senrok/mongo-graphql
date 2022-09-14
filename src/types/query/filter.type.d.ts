import { Class } from "../../common";
import { Filter } from "../../interfaces";
export declare type FilterTypeOptions = {
<<<<<<< ours
  allowedBooleanExpressions?: ("and" | "or" | "nor")[];
=======
  allowedBooleanExpressions?: ('and' | 'or' | 'nor')[];
>>>>>>> theirs
};
export declare type FilterableRelations = Record<string, Class<unknown>>;
export interface FilterConstructor<T> {
  hasRequiredFilters: boolean;
  new (): Filter<T>;
}
export declare function FilterType<T>(TClass: Class<T>): FilterConstructor<T>;
export declare function DeleteFilterType<T>(
<<<<<<< ours
  TClass: Class<T>
): FilterConstructor<T>;
export declare function UpdateFilterType<T>(
  TClass: Class<T>
): FilterConstructor<T>;
export declare function SubscriptionFilterType<T>(
  TClass: Class<T>
): FilterConstructor<T>;
export declare function AggregateFilterType<T>(
  TClass: Class<T>
=======
  TClass: Class<T>,
): FilterConstructor<T>;
export declare function UpdateFilterType<T>(
  TClass: Class<T>,
): FilterConstructor<T>;
export declare function SubscriptionFilterType<T>(
  TClass: Class<T>,
): FilterConstructor<T>;
export declare function AggregateFilterType<T>(
  TClass: Class<T>,
>>>>>>> theirs
): FilterConstructor<T>;
