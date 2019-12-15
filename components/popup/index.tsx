import cx from 'classnames';
import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import Portal from '../portal';
import { isFunction, stopBodyScroll } from '../utils';

/**
 * 1. 先写 interface 可选 必选
 * 2. 再写defaultProps 然后将interface中有默认值的字段的可选符号删去
 * 3. 最后写propTypes  interface中没有可选符号 defaultProps中也没有默认值的字段需要加上isRequired
 */
export type positionType = 'top' | 'right' | 'bottom' | 'left' | 'center';

export interface Props {
  node?: HTMLElement;
  visible: boolean;
  position: positionType;
  mask: boolean;
  maskClosable: boolean;
  onClose: () => void;
  wrapClassName: string;
  contentStyle: React.CSSProperties;
  stopScrollUnderMask: boolean;
  destroyOnClose: boolean;
  transitionName: string;
  transitionDuration: number;
}

const prefixCls = 'dora-popup';

const positions = ['top', 'right', 'bottom', 'left', 'center'];

class Popup extends Component<Props> {
  static propTypes = {
    node: PropTypes.any,
    visible: PropTypes.bool,
    position: PropTypes.oneOf(positions),
    mask: PropTypes.bool,
    maskClosable: PropTypes.bool,
    onClose: PropTypes.func,
    wrapClassName: PropTypes.string,
    contentStyle: PropTypes.object,
    stopScrollUnderMask: PropTypes.bool,
    destroyOnClose: PropTypes.bool,
    transitionName: PropTypes.string,
    transitionDuration: PropTypes.number
  };

  static defaultProps: Partial<Props> = {
    visible: false,
    position: 'center',
    mask: true,
    maskClosable: true,
    onClose: () => {},
    wrapClassName: '',
    contentStyle: {},
    stopScrollUnderMask: true,
    destroyOnClose: false,
    transitionName: '',
    transitionDuration: 350
  };

  /**
   * 初次渲染节点(visible:true => mount)
   * 后续只会隐藏(visible:false => visibility+opacity)
   * 或显示(visible:true => visibility+opacity)节点
   * 不会删除节点（除非父组件卸载或destroyOnClose为true）
   */
  hasFirstRendered: boolean = false;

  componentDidMount() {
    const { visible, mask, stopScrollUnderMask } = this.props;
    if (visible && mask && stopScrollUnderMask) stopBodyScroll(true);
  }

  componentDidUpdate(prevProps: Props) {
    const { visible, mask, stopScrollUnderMask } = this.props;
    if (mask && stopScrollUnderMask) {
      if (prevProps.visible !== visible && visible) stopBodyScroll(true);
      if (prevProps.visible !== visible && !visible) stopBodyScroll(false);
    }
  }

  componentWillUnmount() {
    const { mask, stopScrollUnderMask } = this.props;
    if (mask && stopScrollUnderMask) {
      stopBodyScroll(false);
    }
  }

  handleMaskClick = () => {
    const { onClose, maskClosable } = this.props;
    if (maskClosable && isFunction(onClose)) {
      onClose();
    }
  };

  get transitionName(): string {
    const { position, transitionName } = this.props;
    if (transitionName) return transitionName;
    const transitionNames = {
      bottom: 'dora-slide-up',
      right: 'dora-slide-left',
      left: 'dora-slide-right',
      top: 'dora-slide-down',
      center: 'dora-fade'
    };
    return transitionNames[position];
  }

  render() {
    const {
      visible,
      mask,
      position,
      children,
      node,
      wrapClassName,
      destroyOnClose,
      contentStyle,
      transitionDuration
    } = this.props;
    if (!this.hasFirstRendered && !visible) return null;
    this.hasFirstRendered = true;
    const rootCls = cx(wrapClassName, prefixCls, `${prefixCls}__${position}`, {
      [`${prefixCls}__mask`]: mask
    });

    return (
      <Portal node={node}>
        <div className={rootCls}>
          <CSSTransition in={visible} timeout={350} classNames="dora-fade" appear>
            <div className={`${prefixCls}-mask`} onClick={this.handleMaskClick} />
          </CSSTransition>
          <CSSTransition
            in={visible}
            timeout={transitionDuration}
            classNames={this.transitionName}
            unmountOnExit={destroyOnClose}
            appear
          >
            <div className={`${prefixCls}-content`} style={{ ...contentStyle }}>
              {children}
            </div>
          </CSSTransition>
        </div>
      </Portal>
    );
  }
}

export default Popup;
