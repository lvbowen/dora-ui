import React from 'react';
import Icon from '../icon';

export type SpinnerSize = 'sm' | 'md' | 'lg';

const defaultProps = {
  prefixCls: 'dora-spin',
  size: 'lg' as SpinnerSize
};

type DefaultProps = Readonly<typeof defaultProps>;

type SpinnerProps = Partial<DefaultProps>;

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
