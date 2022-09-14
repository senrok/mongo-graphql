<<<<<<< ours
import { ReturnTypeFunc } from "@nestjs/graphql";
import {
  FilterComparisonOperators,
  FilterFieldComparison,
} from "../../interfaces";
import { Class } from "../../common";
=======
import { ReturnTypeFunc } from '@nestjs/graphql';
import {
  FilterComparisonOperators,
  FilterFieldComparison,
} from '../../interfaces';
import { Class } from '../../common';
>>>>>>> theirs
declare type FilterComparisonOptions<T> = {
  FieldType: Class<T>;
  fieldName: string;
  allowedComparisons?: FilterComparisonOperators<T>[];
  returnTypeFunc?: ReturnTypeFunc;
  transform?: ({ value }: { value: any }) => any;
};
export declare function createFilterComparisonType<T>(
<<<<<<< ours
  options: FilterComparisonOptions<T>
=======
  options: FilterComparisonOptions<T>,
>>>>>>> theirs
): Class<FilterFieldComparison<T>>;
export {};
