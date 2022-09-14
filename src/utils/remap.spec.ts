import { inWhitelist, operations, remap } from './remap';
import { ObjectId } from 'mongodb';

describe('remap', () => {
  it('basic remapping', () => {
    const src = {
      title: { _in: ['weny', 'hi'] },
      _and: [{ title: { _eq: 'weny' } }],
    };
    const target = remap(src, { _in: '$in', _and: '$and' }, {});
    expect(target).toEqual({
      title: { $in: ['weny', 'hi'] },
      $and: [{ title: { _eq: 'weny' } }],
    });
  });

  it('should not in whitelist', () => {
    expect(inWhitelist('_eq', ['title'])).toBeFalsy();
  });

  it('basic whitelist', () => {
    const src = {
      title: { _in: ['weny', 'hi'] },
      _and: [{ title: { _eq: 'weny' } }],
    };
    const target = remap(
      src,
      { _in: '$in', _and: '$and' },
      {},
      { whitelist: ['title'] },
    );
    expect(target).toEqual({
      title: { $in: ['weny', 'hi'] },
      $and: [{ title: {} }],
    });
  });

  it('should ignore empty object', () => {
    const src = {
      title: { _in: ['weny', 'hi'] },
      _and: [{ title: { _eq: 'weny' } }],
    };
    const target = remap(
      src,
      { _in: '$in', _and: '$and' },
      {},
      { whitelist: ['title'], omitEmptyObject: true },
    );
    expect(target).toEqual({
      title: { $in: ['weny', 'hi'] },
      $and: [],
    });
  });

  it('should ignore empty array', () => {
    const src = {
      title: { _in: ['weny', 'hi'] },
      _and: [{ title: { _eq: 'weny' } }],
    };
    const target = remap(
      src,
      { _in: '$in', _and: '$and' },
      {},
      { whitelist: ['title'], omitEmptyObject: true, omitEmptyArray: true },
    );
    expect(target).toEqual({
      title: { $in: ['weny', 'hi'] },
    });
  });

  it('should ignore undefined', () => {
    const src = {
      title: { _in: ['weny', 'hi'] },
      _and: [{ title: { _eq: undefined } }],
    };
    const target = remap(
      src,
      { _in: '$in', _and: '$and' },
      {},
      { whitelist: ['title'] },
    );
    expect(target).toEqual({
      title: { $in: ['weny', 'hi'] },
      $and: [{ title: {} }],
    });
  });

  it('objectId', () => {
    const mockId = new ObjectId();
    const src = {
      _and: [{ title: { _eq: mockId } }],
    };
    const target = remap(src, { _eq: '$eq', _in: '$in', _and: '$and' }, {});
    expect(target).toEqual({
      $and: [{ title: { $eq: mockId } }],
    });
  });

  it('_dot', () => {
    const mockId = new ObjectId();
    const src = {
      user: {
        _dot: {
          name: 'weny',
          gender: 'male',
        },
      },
      identification: {
        _eq: mockId,
      },
    };
    const target = remap(src, { _eq: '$eq' }, operations);
    expect(target).toEqual({
      'user.name': 'weny',
      'user.gender': 'male',
      identification: { $eq: mockId },
    });
  });
});
