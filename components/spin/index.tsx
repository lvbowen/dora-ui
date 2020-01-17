import React, { Component, cloneElement } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import cx from 'classnames';
import debounce from 'lodash/debounce';

import Portal from '../portal';
import Spinner, { Props as SpinnerProps } from '../spinner';

type SpinnerSize = SpinnerProps['size'];

interface Props {
  spinning: boolean;
  fullScreen: boolean;
  spinner: React.ReactElement;
  size: SpinnerSize;
  tip: string;
  wrapperClassName: string;
  transition: boolean;
  delay: number;
}

interface State {
  spinning: boolean;
}

// 是否延迟spinning
function shouldDelay(spinning?: boolean, delay?: number): boolean {
  return !!spinning && !!delay && !isNaN(Number(delay));
}
const prefixCls = 'dora-spin';

class Spin extends Component<Props, State> {
  static propTypes = {
    spinning: PropTypes.bool.isRequired,
    fullScreen: PropTypes.bool,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    children: PropTypes.node,
    spinner: PropTypes.element,
    tip: PropTypes.string,
    wrapperClassName: PropTypes.string,
    transition: PropTypes.bool,
    delay: PropTypes.number
  };

  static defaultProps = {
    fullScreen: true,
    size: 'md',
    tip: '',
    wrapperClassName: '',
    transition: true,
    delay: 0,
    spinner: <Spinner type="wave"></Spinner>
  };

  constructor(props: Props) {
    super(props);

    const { spinning, delay } = props;
    const shouldBeDelayed = shouldDelay(spinning, delay);
    this.state = {
      spinning: spinning && !shouldBeDelayed
    };
    this.debouncifyUpdateSpinning(props);
  }

  componentDidMount() {
    this.updateSpinning();
  }

  /**
   * antd Spin组件每次didupdate中 取消防抖updateSpinning函数的执行 随后重新创建防抖updateSpinning函数进行执行
   * 未直接使用 didmount 中创建的防抖updateSpinning函数 的防抖特性 可参见antd源码3.20.5
   * 此处进行优化： 利用防抖函数特性，无需重复取消创建防抖updateSpinning函数
   */
  componentDidUpdate() {
    this.updateSpinning();
  }

  /**
   * 避免组件卸载后 spinning状态变化而setState报错
   * 参考antd，相关issue https://github.com/ant-design/ant-design/pull/16081
   */
  componentWillUnmount() {
    this.cancelExistingSpin();
  }

  debouncifyUpdateSpinning = (props: Props) => {
    const { delay } = props;
    if (delay) {
      // 取消防抖函数的执行
      this.cancelExistingSpin();
      this.updateSpinning = debounce(this.updateSpinning, delay);
    }
  };

  updateSpinning = () => {
    const { spinning } = this.props;
    const { spinning: currentSpinning } = this.state;
    if (currentSpinning !== spinning) {
      this.setState({ spinning });
    }
  };

  cancelExistingSpin() {
    const updateSpinning: any = this.updateSpinning;
    if (updateSpinning && updateSpinning.cancel) {
      updateSpinning.cancel();
    }
  }

  getSpinElement() {
    const { spinner, tip, size, fullScreen, transition } = this.props;
    const isDefaultSpinner = spinner.type === Spinner;

    const { spinning } = this.state;
    const spinnerContainerCls = cx(`${prefixCls}-spinner-container`, {
      [`${prefixCls}-spinner-container__full`]: fullScreen
    });
    const tipCls = cx(`${prefixCls}-text`, `${prefixCls}-text-${size}`);
    let spinElement = (
      <div className={spinnerContainerCls}>
        {isDefaultSpinner ? cloneElement(spinner, { size: size }) : spinner}
        {tip && <div className={tipCls}>{tip}</div>}
      </div>
    );

    /* 是否为全屏展示 */
    if (fullScreen) {
      spinElement = <Portal>{spinElement}</Portal>;
    }

    /* 是否存在过渡效果 */
    if (transition) {
      return (
        <CSSTransition in={spinning} classNames={'dora-fade'} timeout={300} unmountOnExit>
          {spinElement}
        </CSSTransition>
      );
    }

    if (spinning) {
      return spinElement;
    }

    return null;
  }

  render() {
    const { wrapperClassName, children } = this.props;
    const wrapperCls = cx(wrapperClassName, prefixCls);
    return (
      <div className={wrapperCls}>
        {this.getSpinElement()}
        {children}
      </div>
    );
  }
}

export default Spin;
