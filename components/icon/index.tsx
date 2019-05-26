import React from 'react';
import cx from 'classnames';
import { IconPropsShape } from './interface';
import { FiLoader } from 'react-icons/fi';
import { IoIosCheckmarkCircleOutline, IoIosInformationCircleOutline } from 'react-icons/io';
import { GoX } from 'react-icons/go';
import { TiWarningOutline } from 'react-icons/ti';

interface RealIconMapShape {
  [key: string]: typeof GoX;
}

const realIconMap: RealIconMapShape = {
  success: IoIosCheckmarkCircleOutline,
  error: GoX,
  info: IoIosInformationCircleOutline,
  warning: TiWarningOutline,
  loading: FiLoader
};

const defaultProps: IconPropsShape = {
  type: 'info',
  prefixCls: 'dora-icon',
  size: 'md',
  color: '#000',
  spinning: false,
  onClick: () => {}
};

const Icon: React.FC<IconPropsShape> = userProps => {
  const props = { ...defaultProps, ...userProps };
  const { prefixCls, type, size, color, className, spinning, onClick, ...restProps } = props;
  const RealIcon = realIconMap[type];
  const cls = cx(prefixCls, `${prefixCls}-${size}`, className, {
    [`${prefixCls}-spinning`]: spinning
  });
  const style: React.CSSProperties = {
    color
  };
  return <RealIcon {...restProps} onClick={onClick} className={cls} style={style} />;
};

export default Icon;
