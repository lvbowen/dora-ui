import React from 'react';
import cx from 'classnames';

export interface ButtonProps {
  size?: 'large' | 'default' | 'small';
  type?: 'primary' | 'default' | 'warning';
  prefixCls?: string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const sizeClsMap: any = {
  large: 'dora-btn__large',
  medium: 'dora-btn__medium',
  small: 'dora-btn__small'
};

const typeClsMap: any = {
  primary: 'dora-btn__primary',
  warning: 'dora-btn__warning',
  ghost: 'dora-btn__ghost'
};

const defaultProps = {
  size: 'medium',
  type: 'ghost',
  prefixCls: 'dora-btn'
};

const Button: React.FC<ButtonProps> = function(userProps, ref: any) {
  const props = { ...defaultProps, ...userProps };
  const { size, type, prefixCls } = props;
  const sizeCls = sizeClsMap[size];
  const typeCls = typeClsMap[type];
  const cls = cx(sizeCls, typeCls, prefixCls);
  return (
    <button ref={ref} type="button" className={cls}>
      {props.children}
    </button>
  );
};

export default React.forwardRef(Button);
