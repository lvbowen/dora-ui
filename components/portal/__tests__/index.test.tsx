import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Portal from '../index';

describe('<Portal />', () => {
  test('should append node to <body /> by default', () => {
    const { baseElement } = render(
      <Portal>
        <div>hello,portal</div>
      </Portal>
    );
    expect(baseElement).toMatchSnapshot();
  });

  test('should remove the default container when Portal unmounted', () => {
    const { baseElement, unmount } = render(
      <Portal>
        <div>hello,portal</div>
      </Portal>
    );
    expect(baseElement).toMatchSnapshot();
    unmount();
    expect(baseElement).toMatchSnapshot();
  });

  test('should append node to custom container by props "node"', () => {
    const div = document.createElement('div');
    div.className = 'custom-container';
    document.body.append(div);
    const { baseElement, unmount } = render(
      <Portal node={div}>
        <div>custom container</div>
      </Portal>
    );
    expect(baseElement).toMatchSnapshot();
    unmount();
    expect(baseElement).toMatchSnapshot();
    // custom container will not be removed
    document.body.removeChild(div);
  });
});
