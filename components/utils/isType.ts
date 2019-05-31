export const isUndefined = (x: any) => typeof x === 'undefined';

export const isType = (type: string) => (x: any) =>
  Object.prototype.toString.call(x).slice(8, -1) === type;

export const isArray = isType('Array');

export const isString = isType('String');

export const isFunction = isType('Function');

export const isNumber = (x: any): x is number => typeof x === 'number' && !isNaN(x);

export const isBoolean = (x: any): x is boolean => typeof x === 'boolean';
