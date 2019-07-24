import React, { Component } from 'react';
import cx from 'classnames';
import { isUndefined } from '../utils';
import DefaultSpinner, { SpinnerProps } from './spinner';
import PropTypes from 'prop-types';

interface SpinProps extends SpinnerProps {
  spinning: boolean;
  children: React.ReactNode;
  spinner?: React.ReactElement;
  tip?: string;
  wrapperClassName?: string;
  style?: React.CSSProperties;
}

class Spin extends Component<SpinProps, {}> {
  static propTypes = {
    spinning: PropTypes.bool.isRequired,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    children: PropTypes.node,
    spinner: PropTypes.element,
    tip: PropTypes.string,
    wrapperClassName: PropTypes.string,
    prefixCls: PropTypes.string,
    delay: PropTypes.number,
    style: PropTypes.object
  };

  static defaultProps = {
    size: 'lg',
    tip: '',
    wrapperClassName: '',
    prefixCls: 'dora-spin',
    delay: 0
  };

  getSpinElement() {
    const { spinner, tip, prefixCls, size } = this.props;
    const realSpinner = isUndefined(spinner) ? <DefaultSpinner size={size} /> : spinner;

    return (
      <div className={`${prefixCls}-spinner-container`}>
        {realSpinner}
        {tip && <div className={`${prefixCls}-text`}>{tip}</div>}
      </div>
    );
  }

  render() {
    const { wrapperClassName, prefixCls, style, children, spinning } = this.props;
    const wrapperCls = cx(wrapperClassName, prefixCls);
    const spinElement = this.getSpinElement();
    return (
      <div className={wrapperCls} style={style}>
        {spinning && spinElement}
        {children}
      </div>
    );
  }
}

export default Spin;
