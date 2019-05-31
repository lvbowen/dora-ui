import React, { Component } from 'react';
import { TogglerShape } from './interface';
import { withDefaultProps, isBoolean } from '../utils';

interface StateShape {
  toggled: boolean;
}

const defaultProps = {
  defaultToggled: false,
  afterToggled: () => {}
};

type DefaultProps = typeof defaultProps;
type Props = TogglerShape & DefaultProps;

class Toggler extends Component<Props, StateShape> {
  public constructor(props: Props) {
    super(props);
    this.state = {
      toggled: props.defaultToggled
    };
  }

  private onToggle = (flag?: boolean) => {
    const { afterToggled } = this.props;
    this.setState(
      prevState => ({
        toggled: isBoolean(flag) ? flag : !prevState.toggled
      }),
      () => {
        afterToggled(this.state.toggled);
      }
    );
  };

  public render() {
    const { children } = this.props;
    const { toggled } = this.state;
    return children([toggled, this.onToggle]);
  }
}

export default withDefaultProps(defaultProps, Toggler);
