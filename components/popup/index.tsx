import React, { Component } from 'react';
import cx from 'classnames';
import Portal from '../portal';
import { PopupShape, positionType } from './interface';
import { withDefaultProps } from '../utils';

const prefixCls = 'dora-popup';
const preventScroll = (ev: TouchEvent) => {
  ev.preventDefault();
};

const defaultProps = {
  visible: false,
  mask: true,
  position: 'center' as positionType,
  maskClosable: false,
  hide: () => {}
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
  private disableScroll: boolean = false;
  private rootNode?: HTMLElement;

  public componentDidUpdate() {
    if (this.props.visible && !this.disableScroll) {
      this.disableScroll = true;
      this.disableScrollUnderMask();
    }
  }

  public componentWillUnmount() {
    if (this.rootNode) {
      this.rootNode.removeEventListener('touchmove', preventScroll, false);
    }
  }

  /* css pointer-events属性值为none会使得事件无效
   * 保证了在没有mask的时候(pointer-events:none)滚动正常
   * 存在mask(pointer-events:auto)存在滚动穿透现象 监听touchmove事件生效
   */
  private disableScrollUnderMask = () => {
    this.rootNode = document.querySelector(`.${prefixCls}`) as HTMLElement;
    this.rootNode.addEventListener('touchmove', preventScroll, false);
  };

  private handleMaskClick = () => {
    const { hide, maskClosable } = this.props;
    if (maskClosable) {
      hide();
    }
  };

  public render() {
    const { visible, mask, position, children, node } = this.props;
    if (!this.hasFirstRendered && !visible) return null;
    this.hasFirstRendered = true;
    const rootCls = cx(prefixCls, `${prefixCls}__${position}`, {
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
