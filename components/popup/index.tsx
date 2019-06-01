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
  destroyOnClose: false
};

type DefaultProps = typeof defaultProps;
type Props = PopupShape & DefaultProps;

class Popup extends Component<Props, {}> {
  /**
   * 初次渲染挂载节点(visible:true => mount)
   * 后续只会隐藏(visible:false => display:none)
   * 或显示(visible:true => display:block)节点
   * 不会卸载节点（除非父组件卸载）
   */
  private hasFirstRendered: boolean = false;

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
      bottom: 'dora-popup-slide-up',
      right: 'dora-popup-slide-left',
      left: 'dora-slide-right',
      top: 'dora-slide-down',
      center: 'dora-fade'
    };
    return animationNames[position];
  }

  public render() {
    const { visible, mask, position, children, node, wrapClassName, destroyOnClose } = this.props;
    if (!this.hasFirstRendered && !visible) return null;
    this.hasFirstRendered = true;
    const rootCls = cx(wrapClassName, prefixCls, `${prefixCls}__${position}`, {
      [`${prefixCls}__mask`]: mask,
      [`${prefixCls}__hide`]: !visible
    });
    return (
      <CSSTransition
        in={visible}
        timeout={200}
        classNames="dora-fade"
        unmountOnExit={destroyOnClose}
        appear
      >
        <Portal node={node}>
          <div className={rootCls}>
            <div className={`${prefixCls}-mask`} onClick={this.handleMaskClick} />
            <CSSTransition in={visible} timeout={200} classNames={this.animationName} appear>
              <div className={`${prefixCls}-content`}>{children}</div>
            </CSSTransition>
          </div>
        </Portal>
      </CSSTransition>
    );
  }
}

export default withDefaultProps(defaultProps, Popup);
