import { Class } from "../../common";
import { SortField } from "../../interfaces";
export declare function SortArgs<T>(TClass: Class<T>): Class<SortField<T>>;
export declare function getOrCreateSortType<T>(
<<<<<<< ours
  TClass: Class<T>
=======
  TClass: Class<T>,
>>>>>>> theirs
): Class<SortField<T>>;
