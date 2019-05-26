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

/**
 * 核心展示方法
 * @param type toast类型
 * @param content toast内容
 * @param duration 持续时间
 * @param onClose 关闭后回调方法
 * @param mask 是否展示mask
 */
const show: innerShowFnType = (type, content, duration = 3000, onClose = () => {}, mask = true) => {
  if (!isBrowser) return null;
  return null;
};

/**
 * 生成固定类型toast
 * @param type toast类型
 */
const createFn = (type: string) => {
  const fn: toastFnType = (content, duration, onClose, mask) =>
    show(type, content, duration, onClose, mask);
  return fn;
};

/**
 * 销毁toast
 */
const destroy = () => {};

const Toast = {
  success: createFn(TOAST_TYPES.SUCCESS),
  error: createFn(TOAST_TYPES.ERROR),
  info: createFn(TOAST_TYPES.INFO),
  loading: createFn(TOAST_TYPES.LOADING),
  destroy
};

export default Toast;
