/**
 * Enum for sorting either ASC or DESC.
 */
export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
}

/**
 * Interface to sort a field.
 *
 * Example use in a [[Query]]
 *
 * ```ts
 * // ORDER BY name DESC
 * const query: Query<Item> = {
 *   sorting: [{ field: 'name', direction: SortDirection.DESC }],
 * }
 * ```
 *
 * To sort on multiple fields
 *
 * ```ts
 * // ORDER BY name DESC, age ASC
 * const query: Query<Item> = {
 *   sorting: [
 *     { field: 'name', direction: SortDirection.DESC },
 *     { field: 'age', direction: SortDirection.ASC },
 *   ],
 * }
 * ```
 *
 * @typeparam T - the type of object to sort.
 */
export interface SortField<T> {
  /**
   * A field in type T to sort on.
   */
  field: keyof T;
  /**
   * The direction of the sort (ASC or DESC)
   */
  direction: SortDirection;
}
