import { SortDirection } from '@app/mongodb-graphql/interfaces';
import { formatSorts } from './sort';

describe('format sorts', () => {
  it('basic', () => {
    const raw = [
      { field: 'createdAt', direction: SortDirection.ASC },
      { field: 'userId', direction: SortDirection.DESC },
    ];
    expect(formatSorts(raw)).toEqual({ createdAt: 1, userId: -1 });
  });
});
