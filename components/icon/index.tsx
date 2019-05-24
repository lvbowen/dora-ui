import React from 'react';
import cx from 'classnames';
import { IconProps } from './interface';
import { FiVolume2, FiLoader, FiCheckCircle, FiXCircle, FiAlertCircle } from 'react-icons/fi';

const typeMap: any = {
  success: FiCheckCircle,
  error: FiXCircle,
  info: FiVolume2,
  warning: FiAlertCircle,
  loading: FiLoader
};

const defaultProps = {
  prefixCls: 'dora-icon',
  size: 'md',
  spinning: false
};

const Icon: React.FC<IconProps> = userProps => {
  const arr: number[] = [1, 2, 3];
  console.log(arr.includes(1), Array.isArray(arr));

  const props = { ...defaultProps, ...userProps };
  const { prefixCls, type, size, color, className, spinning, ...restProps } = props;
  const RealIcon = typeMap[type];
  const cls = cx(prefixCls, `${prefixCls}-${size}`, className, {
    [`${prefixCls}-spinning`]: spinning
  });
  const style: React.CSSProperties = {};
  if (color) {
    style.color = color;
  }
  return <RealIcon {...restProps} className={cls} style={style} />;
};

export default Icon;
