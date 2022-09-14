import { FilterFieldComparison } from "./filter-field-comparison.interface";

/**
 * A comparison for fields in T.
 * @example
 * ```ts
 * // name LIKE "Foo%"
 * const filter: Filter<Item> = {
 *   { name: { _regex: '/Foo/' } },
 * }
 * ```
 * @example
 * ```ts
 * // completed IS TRUE
 * const filter: Filter<Item> = {
 *   { completed: { _eq: true } },
 * }
 * ```
 * @typeparam T - the type of object to filter on.
 */
export type FilterComparisons<T> = {
  [K in keyof T]?: FilterFieldComparison<T[K]>;
};

/**
 * A grouping of filters that should be ANDed or ORed together.
 *
 * * @example
 * ```ts
 * // completed IS TRUE OR name = "Foo"
 * const filter: Filter<Item> = {
 *   $or: [
 *     { completed: { _eq: true } },
 *     { name: { _eq: "Foo" } },
 *   ]
 * }
 * ```
 *
 * @example
 * ```ts
 * // completed IS TRUE OR (age > 10 AND age < 20)
 * const filter: Filter<Item> = {
 *   $or: [
 *     { completed: { _eq: true } },
 *     {
 *       $and: [
 *         { age: { _gt : 10 } },
 *         { age: { _lt : 20 } },
 *       ]
 *     },
 *   ]
 * }
 * ```
 */
type FilterGrouping<T> = {
  /**
   * Group an array of filters with an AND operation.
   */
  _and?: Filter<T>[];
  /**
   * Group an array of filters with an OR operation.
   */
  _or?: Filter<T>[];
  /**
   * Group an array of filters with an NOR operation.
   */
  _nor?: Filter<T>[];
};

/**
 * Filter for type T.
 *
 * @example
 * ```ts
 * // name LIKE "Foo%"
 * const filter: Filter<Item> = {
 *   { name: { _regex: '/Foo/' } },
 * }
 * ```
 *
 * @example
 * ```ts
 * // completed IS TRUE
 * const filter: Filter<Item> = {
 *   { completed: { _eq: true } },
 * }
 * ```
 *
 * @example
 * ```ts
 * // completed IS TRUE OR name = "Foo"
 * const filter: Filter<Item> = {
 *   $or: [
 *     { completed: { _eq: true } },
 *     { name: { _eq: "Foo" } },
 *   ]
 * }
 * ```
 *
 * @example
 * ```ts
 * // completed IS TRUE OR (age > 10 AND age < 20)
 * const filter: Filter<Item> = {
 *   $or: [
 *     { completed: { _eq: true } },
 *     {
 *       $and: [
 *         { age: { _gt : 10 } },
 *         { age: { _lt : 20 } },
 *       ]
 *     },
 *   ]
 * }
 * ```
 *
 * @typeparam T - the type of object to filter on.
 */
export type Filter<T> = FilterGrouping<T> & FilterComparisons<T>;
