import React from 'react';
import ReactDOM from 'react-dom';
import Portal from '../portal';
import { toastFnType, innerShowFnType } from './interface';
import { isBrowser } from '../utils';

const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  LOADING: 'loading'
};

const show: innerShowFnType = (type, content, duration = 3000, onClose = () => {}, mask = true) => {
  if (!isBrowser) return null;
};

const createFn = (type: string) => {
  const fn: toastFnType = (content, duration, onClose, mask) =>
    show(type, content, duration, onClose, mask);
  return fn;
};

const hide = () => {};

const Toast = {
  success: createFn(TOAST_TYPES.SUCCESS),
  error: createFn(TOAST_TYPES.ERROR),
  info: createFn(TOAST_TYPES.INFO),
  loading: createFn(TOAST_TYPES.LOADING),
  hide
};

export default Toast;
