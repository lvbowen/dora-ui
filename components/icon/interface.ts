export interface IconPropsShape {
  // 图标的名称
  type: 'success' | 'error' | 'info' | 'warning' | 'loading';
  // size 大小
  size?: 'xss' | 'xs' | 'sm' | 'md' | 'lg';
  // color 图标的颜色
  color?: string;
  // spin 是否有旋转动画, 默认为false
  spinning?: boolean;
  // prefixCls 类名的前缀
  prefixCls?: string;
  // className
  className?: string;
  // onClick
  onClick?: (e: React.MouseEvent) => void;
}
