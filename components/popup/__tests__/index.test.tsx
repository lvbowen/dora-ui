import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { CSSTransition } from 'react-transition-group';
import Popup from '../index';
import '../style';

jest.mock('react-transition-group', () => {
  const FakeTransition = jest.fn(({ children }) => children);
  const FakeCSSTransition = jest.fn(props =>
    props.in ? (
      <FakeTransition>{props.children}</FakeTransition>
    ) : props.unmountOnExit ? null : (
      <div style={{ display: 'none' }}>{props.children}</div>
    )
  );
  return { CSSTransition: FakeCSSTransition, Transition: FakeTransition };
});

const App = ({ position = 'center' }) => {
  const [visible, setVisible] = React.useState(false);
  const [destroyOnClose, setDestroyOnClose] = React.useState(false);
  const [mask, setMask] = React.useState(true);

  return (
    <>
      <button onClick={() => setVisible(!visible)}>toggle modal visible</button>
      <button onClick={() => setDestroyOnClose(!destroyOnClose)}>
        toggle modal destroyOnClose
      </button>
      <button onClick={() => setMask(!mask)}>toggle modal mask</button>
      <Popup
        visible={visible}
        destroyOnClose={destroyOnClose}
        mask={mask}
        maskClosable
        onClose={() => setVisible(false)}
        position={position as any}
        wrapClassName="test-wrap-class"
      >
        content
      </Popup>
    </>
  );
};

describe('<Popup />', () => {
  test('should render outside container', () => {
    const { baseElement, getByText } = render(<App></App>);
    const visibleBtn = getByText(/visible/);

    expect(baseElement).toMatchSnapshot();

    fireEvent.click(visibleBtn);
    expect(baseElement).toMatchSnapshot();

    fireEvent.click(visibleBtn);
    expect(baseElement).toMatchSnapshot();
  });

  test('prop: visible ', () => {
    const { getByText } = render(<App></App>);
    const visibleBtn = getByText(/visible/);

    fireEvent.click(visibleBtn);
    expect(getByText(/content/)).toBeVisible();

    fireEvent.click(visibleBtn);
    expect(getByText(/content/)).not.toBeVisible();
  });

  test('prop: destroyOnClose', () => {
    const { getByText, queryByText } = render(<App></App>);
    const visibleBtn = getByText(/visible/);
    const destroyOnCloseBtn = getByText(/destroyOnClose/);

    fireEvent.click(visibleBtn);
    fireEvent.click(visibleBtn);
    expect(queryByText(/content/)).toBeInTheDocument();

    fireEvent.click(destroyOnCloseBtn);
    fireEvent.click(visibleBtn);
    fireEvent.click(visibleBtn);
    expect(queryByText(/content/)).not.toBeInTheDocument();
  });

  test('prop: mask', () => {
    const { getByText, baseElement } = render(<App></App>);
    const visibleBtn = getByText(/visible/);
    const maskBtn = getByText(/mask/);

    fireEvent.click(visibleBtn);
    expect(baseElement.getElementsByClassName('dora-popup__mask')).toHaveLength(1);
    fireEvent.click(visibleBtn);

    fireEvent.click(maskBtn);

    fireEvent.click(visibleBtn);
    expect(baseElement.getElementsByClassName('dora-popup__mask')).toHaveLength(0);
  });

  test('prop: maskCloseable onClose', () => {
    const { getByText, baseElement } = render(<App></App>);
    const visibleBtn = getByText(/visible/);

    fireEvent.click(visibleBtn);
    expect(getByText(/content/)).toBeVisible();

    fireEvent.click(baseElement.getElementsByClassName('dora-popup-mask')[0]);
    expect(getByText(/content/)).not.toBeVisible();
  });

  test('prop: position', () => {
    const positions = ['center', 'top', 'bottom', 'left', 'right'];

    positions.forEach(position => {
      const { baseElement, unmount } = render(<App position={position}></App>);
      const visibleBtn = screen.getByText(/visible/);

      fireEvent.click(visibleBtn);

      expect(baseElement.getElementsByClassName(`dora-popup__${position}`)).toHaveLength(1);

      unmount();
    });
  });

  test('prop: wrapClassName', () => {
    const { baseElement, getByText } = render(<App></App>);
    const visibleBtn = getByText(/visible/);

    fireEvent.click(visibleBtn);
    expect(baseElement.getElementsByClassName('dora-popup')[0]).toHaveClass('test-wrap-class');
  });
});
