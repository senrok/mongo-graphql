import { ObjectId } from 'mongodb';
import { flatten } from './flatObj';

type Entity = Record<any, any>;
type RemapKeys = Record<string, string>;
type RemapOperations = Record<string, (key: string, value: any) => any>;

type Options = {
  whitelist: boolean | string[];
  omitEmptyObject: boolean;
  omitEmptyArray: boolean;
  omitUndefined: boolean;
  ignoreValueTypes?: any[];
};

const defaultOptions: Options = {
  whitelist: false,
  omitEmptyObject: false,
  omitEmptyArray: false,
  omitUndefined: false,
  ignoreValueTypes: [ObjectId],
};

const keys: RemapKeys = {
  _eq: '$eq',
  _and: '$and',
  _or: '$or',
  _nor: '$nor',
  _ne: '$ne',
  _gt: '$gt',
  _gte: '$gte',
  _lt: '$lt',
  _lte: '$lte',
  _in: '$in',
  _nin: '$nin',
  _all: '$all',
  _exists: '$exists',
  _elemMatch: '$elemMatch',
  _regex: '$regex',
};

export const operations: RemapOperations = {
  _dot: (key, value) => flatten(value, key),
};

export const remapFilter = (
  target: Entity,
  options: Partial<Options> = defaultOptions,
) => remap(target, keys, operations, options);

export const remap = (
  target: Entity,
  keys: RemapKeys,
  operations: RemapOperations,
  options: Partial<Options> = defaultOptions,
) => remapObject(target, keys, operations, { ...defaultOptions, ...options });

export const inWhitelist = (target: string, whitelist: boolean | string[]) => {
  if (typeof whitelist == 'boolean') {
    return !whitelist;
  } else {
    return !!whitelist.find((t) => target == t);
  }
};

const inRemap = (target: string, keys: RemapKeys) => !!keys[target];
const inOperation = (target: string, keys: RemapOperations) => !!keys[target];

const remapObject = (
  target: Entity,
  keys: RemapKeys,
  operations: RemapOperations,
  options: Options,
): Entity => {
  let result = {};
  for (const key in target) {
    const value = target[key];
    const operationKey =
      value && Object.keys(value).find((key) => inOperation(key, operations));
    const getValue = () => {
      if (Array.isArray(value)) {
        if (typeof value?.[0] !== 'object') return value;
        return remapArray(value, keys, options);
      } else if (
        typeof value == 'object' &&
        !options.ignoreValueTypes?.find((i) => value instanceof i)
      ) {
        if (operationKey) {
          return operations[operationKey](key, value[operationKey]);
        }
        return remapObject(value, keys, operations, options);
      } else {
        return value;
      }
    };
    // while remap keys exist or whitelist is false
    if (inRemap(key, keys) || inWhitelist(key, options.whitelist)) {
      const tmp = getValue();
      if (operationKey) {
        result = { ...result, ...getValue() };
        continue;
      }
      if (Array.isArray(tmp) && tmp.length == 0 && options.omitEmptyArray) {
        // ignore empty object
        continue;
      } else if (
        typeof value == 'object' &&
        !Array.isArray(tmp) &&
        Object.keys(tmp).length == 0 &&
        options.omitEmptyObject
      ) {
        continue;
      } else if (tmp == undefined && options.omitUndefined) {
        continue;
      }

      result[keys[key] ?? key] = tmp;
    }
    // ignore key not exists in remap keys while whitelist is true
  }
  return result;
};

const remapArray = (
  target: Entity[] | any[],
  keys: RemapKeys,
  options: Options,
): Entity[] =>
  target
    .map((t) => remapObject(t, keys, operations, options))
    .filter((t) => {
      if (options.omitEmptyObject) {
        if (typeof t == 'object' && Object.keys(t).length == 0) {
          return false;
        }
      }
      return true;
    });
