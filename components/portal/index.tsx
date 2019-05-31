import React from 'react';
import ReactDOM from 'react-dom';
import { PortalPropsShape } from './interface';
import { isBrowser } from '../utils';

class Portal extends React.Component<PortalPropsShape> {
  private defaultNode?: HTMLDivElement;

  public constructor(props: PortalPropsShape) {
    super(props);
    if (!props.node) {
      this.defaultNode = document.createElement('div');
      document.body.appendChild(this.defaultNode);
    }
  }

  public componentWillUnmount() {
    if (this.defaultNode) {
      document.body.removeChild(this.defaultNode);
      this.defaultNode = undefined;
    }
  }

  public render() {
    if (!isBrowser) return null;
    const { children, node } = this.props;
    const container = node || this.defaultNode;
    return ReactDOM.createPortal(children, container as HTMLDivElement);
  }
}

export default Portal;
