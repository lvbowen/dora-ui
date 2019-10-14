import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

export interface ISpinner {
  size?: 'sm' | 'md' | 'lg';
}

const defaultProps = {
  size: 'md'
};

const prefixCls = 'dora-spinner';

const Spinner: React.FC<ISpinner> = userProps => {
  // 默认props
  const props = { ...defaultProps, ...userProps };
  const cls = cx(prefixCls, `${prefixCls}__${props.size}`);

  return (
    <div className={cls}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

// props校验
Spinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default Spinner;
