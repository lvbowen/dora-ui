import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../icon';
import Popup from '../popup';
import { TOAST_TYPES } from './config';
import { isNumber } from '../utils';

const prefixCls = 'dora-toast';

export type toastType = 'success' | 'error' | 'info' | 'loading';

export interface Props {
  container: HTMLElement;
  content: React.ReactNode;
  type: toastType;
  mask: boolean;
  duration: number;
  onClose: (...args: any[]) => any;
}

class ToastContent extends Component<Props, { visible: boolean }> {
  static useIcons = function(iconConfig: { [key: string]: React.ReactElement }) {
    ToastContent.icons = iconConfig;
  };

  static icons: { [key: string]: React.ReactElement } = {};

  static propTypes = {
    container: PropTypes.any.isRequired,
    type: PropTypes.string.isRequired,
    content: PropTypes.node,
    mask: PropTypes.bool,
    duration: PropTypes.number,
    onClose: PropTypes.func
  };

  static defaultProps = {
    mask: false,
    duration: 1500,
    onClose: () => {}
  };

  timer?: any;
  // 是否执行过关闭函数
  isExecClose: boolean = false;

  state = {
    visible: true
  };

  get isLoading(): boolean {
    return this.props.type === TOAST_TYPES.LOADING;
  }

  get isInfo(): boolean {
    return this.props.type === TOAST_TYPES.INFO;
  }

  componentDidMount() {
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
            setTimeout(onClose, 300); // 执行完动画后再卸载组件并执行回调, visble:false时触发动画预留的时间：200
          }
        );
      }, duration);
    }
  }

  componentWillUnmount() {
    if (!this.isExecClose) {
      // 避免强制unmount(Toast.destroy)导致settimeout中的callback不会执行
      this.props.onClose();
    }
    clearTimeout(this.timer);
  }

  renderIcon = () => {
    const { type } = this.props;
    if (typeof ToastContent.icons[type] !== 'undefined') {
      return <div className={`${prefixCls}-icon`}>{ToastContent.icons[type]}</div>;
    }
    if (this.isInfo) return null; // info类型没有Icon
    return (
      <div className={`${prefixCls}-icon`}>
        <Icon type={type} color="#fff" spinning={this.isLoading} size="lg" />
      </div>
    );
  };

  render() {
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

export default ToastContent;
