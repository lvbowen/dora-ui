export type toastFnType = (
  content: React.ReactNode,
  duration?: number,
  onClose?: () => void,
  mask?: boolean
) => void;

export type innerShowFnType = (
  type: string,
  content: React.ReactNode,
  duration?: number,
  onClose?: () => void,
  mask?: boolean
) => void;
