import React, { Component } from 'react';
import Icon from '../icon';
import Popup from '../popup';
import { withDefaultProps } from '../utils';
import { TOAST_TYPES } from './config';
import { ToastContentShape } from './interface';
import { isNumber } from '../utils';

const prefixCls = 'dora-toast';
const defaultProps = {
  mask: false,
  duration: 1500,
  onClose: () => {}
};

type DefaultProps = typeof defaultProps;
type Props = ToastContentShape & DefaultProps;
class ToastContent extends Component<Props, { visible: boolean }> {
  private timer?: any;
  // 是否执行过关闭函数
  private isExecClose: boolean = false;

  public state = {
    visible: true
  };

  private get isLoading(): boolean {
    return this.props.type === TOAST_TYPES.LOADING;
  }

  private get isInfo(): boolean {
    return this.props.type === TOAST_TYPES.INFO;
  }

  public componentDidMount() {
    const { duration, onClose } = this.props;
    if (!this.isLoading && isNumber(duration)) {
      // 非loading类型存在展示时间
      this.timer = setTimeout(() => {
        this.setState(
          {
            visible: false // 隐藏popup
          },
          () => {
            this.isExecClose = true;
            setTimeout(onClose, 200); // 执行完动画后再卸载组件并执行回调, visble:false时触发动画预留的时间：200
          }
        );
      }, duration);
    }
  }

  public componentWillUnmount() {
    if (!this.isExecClose) {
      // 避免强制unmount(Toast.destroy)导致settimeout中的callback不会执行
      this.props.onClose();
    }
    clearTimeout(this.timer);
  }

  private renderIcon = () => {
    const { type } = this.props;
    // info类型没有Icon
    if (this.isInfo) return null;
    return (
      <div className="toast-icon">
        <Icon type={type} color="#fff" spinning={this.isLoading} size="lg" />
      </div>
    );
  };

  public render() {
    const { visible } = this.state;
    const { container, content, mask } = this.props;
    return (
      <Popup visible={visible} node={container} mask={mask} maskClosable={false}>
        <div className={`${prefixCls}-content`}>
          {this.renderIcon()}
          <div className={`${prefixCls}-text`}>{content}</div>
        </div>
      </Popup>
    );
  }
}

export default withDefaultProps(defaultProps, ToastContent);
