import React from 'react';
import Icon from '../icon';

enum SpinSizes {
  sm = 'sm',
  md = 'md',
  lg = 'lg'
}

export interface SpinnerProps {
  size: SpinSizes;
  prefixCls?: string;
}

const defaultProps = {
  prefixCls: 'dora-spin',
  size: 'lg'
};

const Spinner: React.SFC<SpinnerProps> = userProps => {
  const props = { ...defaultProps, ...userProps };
  const { prefixCls, size } = props;
  return (
    <div className={`${prefixCls}-spinner`}>
      <Icon spinning type="loading" color="#fff" size={size} />
    </div>
  );
};

export default Spinner;
