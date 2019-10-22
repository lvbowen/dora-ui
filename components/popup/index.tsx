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

export type transitionType =
  | 'dora-fade'
  | 'dora-zoom'
  | 'dora-slide-up'
  | 'dora-slide-down'
  | 'dora-slide-right'
  | 'dora-slide-left';

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
  transitionName: transitionType;
  transitionDuration: number;
  maskTransitionName: transitionType;
  maskTransitionDuration: number;
}

const prefixCls = 'dora-popup';

const positions = ['top', 'right', 'bottom', 'left', 'center'];

const transitionNames = [
  'dora-fade',
  'dora-zoom',
  'dora-slide-up',
  'dora-slide-down',
  'dora-slide-right',
  'dora-slide-left'
];

class Popup extends Component<Props> {
  static propTypes = {
    node: PropTypes.instanceOf(Element),
    visible: PropTypes.bool,
    position: PropTypes.oneOf(positions),
    mask: PropTypes.bool,
    maskClosable: PropTypes.bool,
    onClose: PropTypes.func,
    wrapClassName: PropTypes.string,
    contentStyle: PropTypes.object,
    stopScrollUnderMask: PropTypes.bool,
    destroyOnClose: PropTypes.bool,
    transitionName: PropTypes.oneOf(transitionNames),
    transitionDuration: PropTypes.number,
    maskTransitionName: PropTypes.oneOf(transitionNames),
    maskTransitionDuration: PropTypes.number
  };

  static defaultProps: Partial<Props> = {
    visible: false,
    position: 'center' as positionType,
    mask: true,
    maskClosable: true,
    onClose: () => {},
    wrapClassName: '',
    contentStyle: {},
    stopScrollUnderMask: true,
    destroyOnClose: false,
    transitionName: '' as transitionType,
    maskTransitionName: 'dora-fade' as transitionType,
    transitionDuration: 300,
    maskTransitionDuration: 300
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
    return transitionNames[position] as transitionType;
  }

  render() {
    const {
      visible,
      mask,
      maskTransitionName,
      position,
      children,
      node,
      wrapClassName,
      destroyOnClose,
      contentStyle,
      transitionDuration,
      maskTransitionDuration
    } = this.props;
    if (!this.hasFirstRendered && !visible) return null;
    this.hasFirstRendered = true;
    const rootCls = cx(wrapClassName, prefixCls, `${prefixCls}__${position}`, {
      [`${prefixCls}__mask`]: mask
    });

    return (
      <CSSTransition
        in={visible}
        timeout={maskTransitionDuration}
        classNames={maskTransitionName}
        unmountOnExit={destroyOnClose}
        appear
      >
        <Portal node={node}>
          <div className={rootCls}>
            <div className={`${prefixCls}-mask`} onClick={this.handleMaskClick} />
            <CSSTransition
              in={visible}
              timeout={transitionDuration}
              classNames={this.transitionName}
              appear
            >
              <div className={`${prefixCls}-content`} style={{ ...contentStyle }}>
                {children}
              </div>
            </CSSTransition>
          </div>
        </Portal>
      </CSSTransition>
    );
  }
}

export default Popup;
