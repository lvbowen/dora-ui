export interface IconProps {
  // 图标的名称
  type: string;
  // size 大小
  size?: number;
  // color 图标的颜色
  color?: string;
  // spin 是否有旋转动画, 默认为false
  loading?: boolean;
  // prefixCls 类名的前缀
  prefixCls?: string;
  // className
  className?: string;
  // onClick
  onClick?: (e: React.MouseEvent) => void;
}
