/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from 'react';
import warning from 'warning';
import { TogglerShape } from './interface';
import { withDefaultProps, isBoolean, isFunction } from '../utils';

interface StateShape {
  toggled: boolean;
}

const defaultProps = {
  defaultToggled: false,
  afterToggled: (flag: boolean) => {},
};

type DefaultProps = typeof defaultProps;
type Props = TogglerShape & DefaultProps; // 交叉类型 属性全部变成了必填 抹去了组件内部默认属性可能为undefined的情况

class Toggler extends Component<Props, StateShape> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      toggled: props.defaultToggled,
    };
  }

  private onToggle = (flag?: boolean) => {
    const { afterToggled } = this.props;
    this.setState(
      prevState => ({
        toggled: isBoolean(flag) ? flag : !prevState.toggled,
      }),
      () => {
        afterToggled(this.state.toggled);
      },
    );
  };

  public render() {
    const { children } = this.props;
    warning(isFunction(children), 'Props endTime must be a function which returns JSX.Element');
    const { toggled } = this.state;
    return isFunction(children) ? children([toggled, this.onToggle]) : null;
  }
}

export default withDefaultProps(defaultProps, Toggler);
