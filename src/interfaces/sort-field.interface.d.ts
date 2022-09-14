export declare enum SortDirection {
<<<<<<< ours
  ASC = "ASC",
  DESC = "DESC",
=======
  ASC = 'ASC',
  DESC = 'DESC',
>>>>>>> theirs
}
export interface SortField<T> {
  field: keyof T;
  direction: SortDirection;
}
