import { SortDirection, SortField } from '../interfaces';

export type Sortable<T> = {
  [P in keyof T]?: 1 | -1;
};

export const defaultCreatedAtDescSort: SortField<any> = {
  field: 'createdAt',
  direction: SortDirection.DESC,
};

export const formatSorts = <T>(
  field?: SortField<T> | SortField<T>[],
  defaultSort?: SortField<T>,
): Sortable<T> => {
  const result: Sortable<T> = {};
  const fields = !!field ? (Array.isArray(field) ? field : [field]) : [];
  if (!field && defaultSort) {
    fields.push(defaultSort);
  }
  fields.forEach((f) => {
    result[f.field] = f.direction == SortDirection.ASC ? 1 : -1;
  });
  return result;
};
