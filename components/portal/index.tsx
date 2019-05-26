import React from 'react';
import ReactDOM from 'react-dom';
import { PortalPropsShape } from './interface';
import { isBrowser } from '../utils';

class Portal extends React.Component<PortalPropsShape, {}> {
  private defaultNode: HTMLDivElement | null = null;

  public constructor(props: PortalPropsShape) {
    super(props);
    if (!this.props.node) {
      this.defaultNode = document.createElement('div');
      document.body.appendChild(this.defaultNode);
    }
  }

  public componentWillUnmount() {
    if (this.defaultNode) {
      document.body.removeChild(this.defaultNode);
      this.defaultNode = null;
    }
  }

  public render() {
    if (!isBrowser) return null;
    const { children, node } = this.props;
    const container = (node || this.defaultNode) as HTMLElement;
    return ReactDOM.createPortal(children, container);
  }
}

export default Portal;
