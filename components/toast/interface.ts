export type toastType = 'success' | 'error' | 'info' | 'loading';

export type toastFnType = (
  content: React.ReactNode,
  duration?: number,
  onClose?: () => void,
  mask?: boolean
) => void;

export type innerShowFnType = (
  type: toastType,
  content: React.ReactNode,
  duration?: number,
  onClose?: () => void,
  mask?: boolean
) => void;

export interface ToastContentShape {
  container: HTMLElement | null;
  content: React.ReactNode;
  type: toastType;
  mask?: boolean;
  isIn: boolean;
  close?: () => void;
}
