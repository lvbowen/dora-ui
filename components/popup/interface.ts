export type positionType = 'top' | 'right' | 'bottom' | 'left' | 'center';

export type transitionType =
  | 'dora-fade'
  | 'dora-zoom'
  | 'dora-slide-up'
  | 'dora-slide-down'
  | 'dora-slide-right'
  | 'dora-slide-left';

export interface PopupShape {
  visible?: boolean;
  children: React.ReactNode;
  position?: positionType;
  mask?: boolean;
  maskClosable?: boolean;
  onClose?: () => void;
  node?: HTMLElement;
  wrapClassName?: string;
  contentStyle?: React.CSSProperties;
  stopScrollUnderMask?: boolean;
  destroyOnClose?: boolean;
  transitionName?: transitionType;
  transitionDuration?: number;
  maskTransitionName?: transitionType;
  maskTransitionDuration?: number;
}
