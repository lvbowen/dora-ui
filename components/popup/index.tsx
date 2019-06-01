import React, { Component } from 'react';
import cx from 'classnames';
import Portal from '../portal';
import { PopupShape, positionType } from './interface';
import { withDefaultProps, stopBodyScroll } from '../utils';

const prefixCls = 'dora-popup';

const defaultProps = {
  visible: false,
  mask: true,
  position: 'center' as positionType,
  maskClosable: true,
  onCancel: () => {},
  wrapClassName: '',
  stopScrollUnderMask: true
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
    if (mask && stopScrollUnderMask) stopBodyScroll(false);
  }

  private handleMaskClick = () => {
    const { onCancel, maskClosable } = this.props;
    if (maskClosable) {
      onCancel();
    }
  };

  public render() {
    const { visible, mask, position, children, node, wrapClassName } = this.props;
    if (!this.hasFirstRendered && !visible) return null;
    this.hasFirstRendered = true;
    const rootCls = cx(wrapClassName, prefixCls, `${prefixCls}__${position}`, {
      [`${prefixCls}__mask`]: mask,
      [`${prefixCls}__hide`]: !visible
    });
    const containerCls = cx(`${prefixCls}-container`, `${prefixCls}-container__${position}`);
    return (
      <Portal node={node}>
        <div className={rootCls}>
          <div className={`${prefixCls}-mask`} onClick={this.handleMaskClick} />
          <div className={containerCls}>
            <div className={`${prefixCls}-content`}>{children}</div>
          </div>
        </div>
      </Portal>
    );
  }
}

export default withDefaultProps(defaultProps, Popup);
