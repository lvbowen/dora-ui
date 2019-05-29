import React, { Component } from 'react';
import cx from 'classnames';
import { CSSTransition } from 'react-transition-group';
import Icon from '../icon';
import Portal from '../portal';
import { TOAST_TYPES } from './config';
import { ToastContentShape } from './interface';

const prefixCls = 'dora-toast';

const ToastTransition = (props: any) => {
  const { children, ...restProps } = props;
  return (
    <CSSTransition {...restProps} timeout={500} classNames="dora-fade">
      {children}
    </CSSTransition>
  );
};

class ToastContent extends Component<ToastContentShape, {}> {
  private static defaultProps = {
    mask: false,
    content: ''
  };

  private onExited = () => {
    const { close } = this.props;
    typeof close === 'function' && close();
  };

  private renderIcon = () => {
    const { type } = this.props;
    if (type === TOAST_TYPES.INFO) return null;
    const spinning = type === TOAST_TYPES.LOADING;
    return (
      <div className="toast-icon">
        <Icon type={type} color="#fff" spinning={spinning} size="lg" />
      </div>
    );
  };

  public render() {
    const { container, content, mask, isIn } = this.props;
    const cls = cx(prefixCls, { [`${prefixCls}-mask`]: mask });
    return (
      <Portal node={container}>
        <ToastTransition appear unmountOnExit in={isIn} onExited={this.onExited}>
          <div className={cls}>
            <div className={`${prefixCls}-content`}>
              {this.renderIcon()}
              <div className={`${prefixCls}-text`}>{content}</div>
            </div>
          </div>
        </ToastTransition>
      </Portal>
    );
  }
}

export default ToastContent;
