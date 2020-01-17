import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

export interface Props {
  size?: 'sm' | 'md' | 'lg';
  type?: 'normal' | 'wave';
}

const prefixCls = 'dora-spinner';

const Spinner: React.FC<Props> = ({ size = 'md', type = 'normal' }) => {
  const cls = cx(prefixCls, `${prefixCls}__${size}`, `${prefixCls}__${type}`);
  if (type === 'normal') {
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
  }

  return (
    <div className={cls}>
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
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  type: PropTypes.oneOf(['normal', 'wave'])
};

export default Spinner;
