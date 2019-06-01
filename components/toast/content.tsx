import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import Icon from '../icon';
import Popup from '../popup';
import { withDefaultProps } from '../utils';
import { TOAST_TYPES } from './config';
import { ToastContentShape } from './interface';

const prefixCls = 'dora-toast';
const defaultProps = {
  mask: false
};

type DefaultProps = typeof defaultProps;
type Props = ToastContentShape & DefaultProps;
class ToastContent extends Component<Props> {
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
    return (
      <CSSTransition appear in timeout={100} classNames="dora-fade">
        <Popup visible node={container} mask={mask} maskClosable={false}>
          <div className={`${prefixCls}-content`}>
            {this.renderIcon()}
            <div className={`${prefixCls}-text`}>{content}</div>
          </div>
        </Popup>
      </CSSTransition>
    );
  }
}

export default withDefaultProps(defaultProps, ToastContent);
