export const isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export {
  isType,
  isUndefined,
  isArray,
  isString,
  isFunction,
  isNumber,
  isBoolean,
  isNull,
} from './isType';

export { withDefaultProps, createPropsGetter } from './withDefaultProps';

export { stopBodyScroll } from './dom';
