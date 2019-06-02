import React, { Component } from 'react';
import cx from 'classnames';
import { CSSTransition } from 'react-transition-group';
import Portal from '../portal';
import { PopupShape, positionType } from './interface';
import { withDefaultProps, stopBodyScroll, isFunction } from '../utils';

const prefixCls = 'dora-popup';

const defaultProps = {
  visible: false,
  mask: true,
  position: 'center' as positionType,
  maskClosable: true,
  onClose: () => {},
  wrapClassName: '',
  stopScrollUnderMask: true,
  destroyOnClose: false,
  animated: true
};

type DefaultProps = typeof defaultProps;
type Props = PopupShape & DefaultProps;

class Popup extends Component<Props, {}> {
  /**
   * 初次渲染节点(visible:true => mount)
   * 后续只会隐藏(visible:false => visibility+opacity)
   * 或显示(visible:true => visibility+opacity)节点
   * 不会删除节点（除非父组件卸载或destroyOnClose为true）
   */
  private hasFirstRendered: boolean = false;

  public componentDidMount() {
    const { visible, mask, stopScrollUnderMask } = this.props;
    if (visible && mask && stopScrollUnderMask) stopBodyScroll(true);
  }

  public componentDidUpdate(prevProps: Props) {
    const { visible, mask, stopScrollUnderMask } = this.props;
    if (mask && stopScrollUnderMask) {
      if (prevProps.visible !== visible && visible) stopBodyScroll(true);
      if (prevProps.visible !== visible && !visible) stopBodyScroll(false);
    }
  }

  public componentWillUnmount() {
    const { mask, stopScrollUnderMask } = this.props;
    if (mask && stopScrollUnderMask) {
      stopBodyScroll(false);
    }
  }

  private handleMaskClick = () => {
    const { onClose, maskClosable } = this.props;
    if (maskClosable && isFunction(onClose)) {
      onClose();
    }
  };

  public get animationName(): string {
    const { position } = this.props;
    const animationNames = {
      bottom: 'dora-slide-up',
      right: 'dora-slide-left',
      left: 'dora-slide-right',
      top: 'dora-slide-down',
      center: 'dora-fade'
    };
    return animationNames[position];
  }

  public render() {
    const {
      visible,
      mask,
      position,
      children,
      node,
      wrapClassName,
      destroyOnClose,
      animated
    } = this.props;
    if (!this.hasFirstRendered && !visible) return null;
    this.hasFirstRendered = true;
    const rootCls = cx(wrapClassName, prefixCls, `${prefixCls}__${position}`, {
      [`${prefixCls}__mask`]: mask
    });
    const animationDuration = animated ? 300 : 0;

    return (
      <CSSTransition
        in={visible}
        timeout={animationDuration}
        classNames="dora-fade"
        unmountOnExit={destroyOnClose}
        appear
      >
        <Portal node={node}>
          <div className={rootCls}>
            <div className={`${prefixCls}-mask`} onClick={this.handleMaskClick} />
            <CSSTransition
              in={visible}
              timeout={animationDuration}
              classNames={this.animationName}
              appear
            >
              <div className={`${prefixCls}-content`}>{children}</div>
            </CSSTransition>
          </div>
        </Portal>
      </CSSTransition>
    );
  }
}

export default withDefaultProps(defaultProps, Popup);
