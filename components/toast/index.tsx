import React from 'react';
import ReactDOM from 'react-dom';
import ToastContent from './content';
import { TOAST_TYPES } from './config';
import { toastFnType, innerShowFnType, toastType } from './interface';
import { isBrowser, isFunction } from '../utils';

// 容器节点
let container: HTMLElement | null = null;

// 是否存在正在展示的toast
let isShowing = false;

/**
 * 创建容器节点
 */
const createContainer = () => {
  container = document.createElement('div');
  container.className = 'dora-toast-container';
  document.body.appendChild(container);
};

/**
 * 销毁toast
 */
const destroy = (onClose: () => void) => {
  if (container) {
    ReactDOM.unmountComponentAtNode(container);
    isShowing = false;
    isFunction(onClose) && onClose();
  }
};

/**
 * 核心展示方法
 * @param type toast类型
 * @param content toast内容
 * @param duration 持续时间
 * @param onClose 关闭后回调方法
 * @param mask 是否展示mask
 */
const show: innerShowFnType = (type, content, duration = 2000, onClose = () => {}, mask) => {
  if (!isBrowser || isShowing) return;
  !container && createContainer();
  ReactDOM.render(
    <ToastContent container={container} type={type} content={content} mask={mask} />,
    container
  );
  isShowing = true;
  if (type !== TOAST_TYPES.LOADING) {
    setTimeout(() => {
      destroy(onClose);
    }, duration);
  }
};

/**
 * 生成固定类型toast方法
 * @param type toast类型
 */
const createFn = (type: toastType) => {
  const fn: toastFnType = (content, duration, onClose, mask) => {
    show(type, content, duration, onClose, mask);
  };
  return fn;
};

const Toast = {
  success: createFn(TOAST_TYPES.SUCCESS),
  error: createFn(TOAST_TYPES.ERROR),
  info: createFn(TOAST_TYPES.INFO),
  loading: createFn(TOAST_TYPES.LOADING),
  destroy
};

export default Toast;
