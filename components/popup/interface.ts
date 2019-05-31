export interface PopupShape {
  visible: boolean;
  children: React.ReactNode;
  mask?: boolean;
  position?: 'top' | 'right' | 'bottom' | 'left' | 'center';
  maskClosable?: boolean;
  hide: () => void;
}
