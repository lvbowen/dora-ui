import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Portal from '../portal';
import { isUndefined } from '../utils';
import DefaultSpinner, { SpinnerProps } from './spinner';

interface SpinProps extends SpinnerProps {
  spinning: boolean;
  fullScreen?: boolean;
  children: React.ReactNode;
  spinner?: React.ReactElement;
  tip?: string;
  wrapperClassName?: string;
  style?: React.CSSProperties;
}

class Spin extends Component<SpinProps, {}> {
  static propTypes = {
    spinning: PropTypes.bool.isRequired,
    fullScreen: PropTypes.bool,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    children: PropTypes.node,
    spinner: PropTypes.element,
    tip: PropTypes.string,
    wrapperClassName: PropTypes.string,
    prefixCls: PropTypes.string,
    style: PropTypes.object
  };

  static defaultProps = {
    fullScreen: false,
    size: 'lg',
    tip: '',
    wrapperClassName: '',
    prefixCls: 'dora-spin',
    style: {}
  };

  getSpinElement() {
    const { spinner, tip, prefixCls, size, fullScreen } = this.props;
    let realSpinner = isUndefined(spinner) ? <DefaultSpinner size={size} /> : spinner;

    const spinnerContainerCls = cx(`${prefixCls}-spinner-container`, {
      [`${prefixCls}-spinner-container__full`]: fullScreen
    });
    const tipCls = cx(`${prefixCls}-text`, `${prefixCls}-text-${size}`);
    const spinElement = (
      <div className={spinnerContainerCls}>
        {realSpinner}
        {tip && <div className={tipCls}>{tip}</div>}
      </div>
    );
    if (fullScreen) {
      return <Portal>{spinElement}</Portal>;
    }
    return spinElement;
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
