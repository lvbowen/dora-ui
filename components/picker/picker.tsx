import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Props, State } from './interface';

class Picker extends Component<Props, State> {
  static propTypes = {
    isCascade: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    col: PropTypes.number.isRequired,
    value: PropTypes.arrayOf(PropTypes.string),
    text: PropTypes.string, // popup组件中间的提示文字
    cancelText: PropTypes.string, // 取消按钮文案
    okText: PropTypes.string, //确认按钮文案
    onChange: PropTypes.func.isRequired, // 点击确定之后的回调
    onCancel: PropTypes.func.isRequired, // 取消之后的回调
    onPickerChange: PropTypes.func, // 每一列的值变化之后的回调
    visible: PropTypes.bool, // 是否可见
    mask: PropTypes.bool, // 是否存在蒙层
    maskClosable: PropTypes.bool, // 点击蒙层是否可以关闭
    stopScrollUnderMask: PropTypes.bool, // 禁止滚动穿透
    wrapClassName: PropTypes.string // 包装类名
  };

  static defaultProps = {
    isCascade: true,
    col: 1,
    value: [],
    text: '请选择',
    cancelText: '取消',
    okText: '确定',
    visible: false,
    mask: true,
    maskClosable: true,
    stopScrollUnderMask: true,
    wrapClassName: ''
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  render() {
    const { isCascade, data } = this.props;

    if (isCascade) {
      console.log(data);
    } else {
      console.log(data);
    }
    return <div>hello</div>;
  }
}

export default Picker;
