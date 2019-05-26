export type toastFnType = (
  content: React.ReactNode,
  duration?: number,
  onClose?: () => void,
  mask?: boolean
) => number | null;

export type innerShowFnType = (
  type: string,
  content: React.ReactNode,
  duration?: number,
  onClose?: () => void,
  mask?: boolean
) => number | null;
