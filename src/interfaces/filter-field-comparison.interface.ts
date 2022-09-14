/**
 * Field comparisons with a type of `boolean`.
 */
import { Filter } from "./filter.interface";

/**
 * Field comparisons for all types that are NOT `null` or `boolean`.
 *
 * @typeparam FieldType - The TS type of the field.
 */
export interface CommonFieldComparisonType<FieldType> {
  /**
   * Field equality.
   *
   * ```ts
   * // field = "bar"
   * { field: { _eq: 'bar' } }
   * ```
   */
  _eq?: FieldType;
  /**
   * Field in-equality.
   *
   * ```ts
   * // field != "bar"
   * { field: { _ne: 'bar' } }
   * ```
   */
  _ne?: FieldType;
  /**
   * Greater than comparison.
   *
   * ```ts
   * // field > 1
   * { field: { _gt: 1 } }
   * ```
   */
  _gt?: FieldType;
  /**
   * Greater than or equal to comparison.
   *
   * ```ts
   * // field >= 1
   * { field: { _gte: 1 } }
   * ```
   */
  _gte?: FieldType;
  /**
   * Less than comparison.
   *
   * ```ts
   * // field < 1
   * { field: { _lt: 1 } }
   * ```
   */
  _lt?: FieldType;
  /**
   * Less than or equal to comparison.
   *
   * ```ts
   * // field <= 1
   * { field: { _lte: 1 } }
   * ```
   */
  _lte?: FieldType;
  /**
   * Check that a field is included in an array of values.
   *
   * ```ts
   * // field IN ("a", "b", "c")
   * { field: { _in: ['a', 'b', 'c'] } }
   * ```
   */
  _in?: FieldType[];
  /**
   * Check that a field is not included in an array of values.
   *
   * ```ts
   * // field NOT IN ("a", "b", "c")
   * { field: { _nin: ['a', 'b', 'c'] } }
   * ```
   */
  _nin?: FieldType[];

  /**
   * Check that a field is contains all value in an array.
   *
   * ```ts
   * { field: { _all: ['a', 'b', 'c'] } }
   * ```
   */
  _all?: FieldType[];

  /**
   * Check that a field is _nin
   *
   * ```ts
   * // field is _nin
   * { field: { _exists: true }
   * ```
   */
  _exists?: boolean;
  /**
   * { results: { _elemMatch: { product: { _eq: "xyz" } } } }
   */
  _elemMatch?: FieldType;

  _dot?: FieldType;
}

/**
 * Field comparisons for `string` types.
 */
export interface StringFieldComparisons
  extends CommonFieldComparisonType<string> {
  _regex?: string;
  _options?: string;
}

type BuiltInTypes =
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
  /**
   * Is operator.
   *
   * ```ts
   * // field IS TRUE
   * { field: { _eq: true } }
   *
   * // field IS FALSE
   * { field: { _eq: false } }
   *
   * // field IS NULL
   * { field: { _eq: null } }
   * ```
   */
  _eq?: boolean | null;
}

/**
 * Type for field comparisons.
 *
 * * `string` - [[StringFieldComparisons]]
 * * `boolean|null|undefined|never` - [[BooleanFieldComparisons]]
 * * all other types use [[CommonFieldComparisonType]]
 */
// eslint-disable-next-line @typescript-eslint/ban-types
type FilterFieldComparisonType<
  FieldType,
  IsKeys extends true | false
> = FieldType extends string | string
  ? StringFieldComparisons // eslint-disable-next-line @typescript-eslint/ban-types
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
  ? CommonFieldComparisonType<U> | Filter<U> // eslint-disable-next-line @typescript-eslint/ban-types
  : IsKeys extends true
  ? CommonFieldComparisonType<FieldType> &
      StringFieldComparisons &
      Filter<FieldType>
  : CommonFieldComparisonType<FieldType> | Filter<FieldType>;

/**
 * Type for field comparisons.
 *
 * * `string` - [[StringFieldComparisons]]
 * * `boolean|null|undefined|never` - [[BooleanFieldComparisons]]
 * * all other types use [[CommonFieldComparisonType]]
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export type FilterFieldComparison<FieldType> = FilterFieldComparisonType<
  FieldType,
  false
>;

/**
 * Type for all comparison operators for a field type.
 *
 * @typeparam FieldType - The TS type of the field.
 */
export type FilterComparisonOperators<FieldType> =
  keyof FilterFieldComparisonType<FieldType, true>;
