import { flatten } from './flatObj';

describe('flat', () => {
  it('basic', () => {
    expect(
      flatten({
        a: 'jack',
        b: {
          c: 'sparrow',
          d: {
            e: 'hahaha',
          },
        },
      }),
    ).toEqual({
      a: 'jack',
      'b.c': 'sparrow',
      'b.d.e': 'hahaha',
    });
  });
});
