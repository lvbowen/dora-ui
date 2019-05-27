import React, { Component } from 'react';
import { Spring } from 'react-spring/renderprops';
import cx from 'classnames';
import Icon from '../icon';
import Portal from '../portal';
import { TOAST_TYPES } from './config';
import { ToastContentShape } from './interface';

class ToastContent extends Component<ToastContentShape, {}> {
  private static defaultProps = {
    mask: false,
    content: ''
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
    const { container, content, mask } = this.props;
    const cls = cx('dora-toast', { 'dora-toast__mask': mask });
    return (
      <Portal node={container}>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {props => (
            <div className={cls} style={props}>
              <div className="toast-content">
                {this.renderIcon()}
                <div className="toast-text">{content}</div>
              </div>
            </div>
          )}
        </Spring>
      </Portal>
    );
  }
}

export default ToastContent;
