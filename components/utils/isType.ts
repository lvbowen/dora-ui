const toString = Object.prototype.toString;

export const isUndefined = (x: any) => typeof x === 'undefined';

export const isType = (type: string) => (x: any) => toString.call(x).slice(8, -1) === type;

export const isArray = isType('Array');

export const isString = isType('String');

export const isFunction = isType('Function');

export const isNull = isType('Null');

export const isPlainObject = isType('Object');

export const isNumber = (x: any): x is number => typeof x === 'number' && !isNaN(x);

export const isBoolean = (x: any): x is boolean => typeof x === 'boolean';
