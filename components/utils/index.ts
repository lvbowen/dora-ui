export const isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export { isType, isUndefined, isArray, isString, isFunction, isNumber, isBoolean } from './isType';

export { withDefaultProps } from './withDefaultProps';
