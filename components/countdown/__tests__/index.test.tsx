import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Countdown from '../index';

describe('<Countdown />', () => {
  test('should render default', () => {
    const { container } = render(
      <Countdown endTime={new Date().getTime() + 1000 * 60 * 60 * 24 * 3} />
    );
    expect(container.firstChild).toHaveClass('dora-countdown');
    expect(container).toHaveTextContent(/\d{1}天\d{2}时\d{2}分\d{2}秒/);
    expect(container).toMatchSnapshot();
  });

  test('should render with custom wrapClassName', () => {
    const { container } = render(
      <Countdown
        endTime={new Date().getTime() + 1000 * 60 * 60 * 24 * 3}
        wrapClassName="test-class"
      />
    );
    expect(container.firstChild).toHaveClass('test-class');
  });

  test('should render with custom template', () => {
    const { container } = render(
      <Countdown
        format="dd-d hh-时 mm-min ss-miao"
        endTime={new Date().getTime() + 1000 * 60 * 60 * 24 * 3}
      />
    );
    expect(container).toHaveTextContent(/\d{1}d\d{2}时\d{2}min\d{2}miao/);
  });

  test('padding zero(except day) depends on props padding when under 10', () => {
    const { container: container1 } = render(
      <Countdown padding={false} endTime={new Date().getTime() + 1000 * 9} />
    );
    expect(container1).toHaveTextContent(/\d{1}天\d{1}时\d{1}分\d{1}秒/);

    const { container: container2 } = render(
      <Countdown padding={true} endTime={new Date().getTime() + 1000 * 9} />
    );
    expect(container2).toHaveTextContent(/\d{1}天\d{2}时\d{2}分\d{2}秒/);
  });

  test('should show day`s padding zero when props daysPadding is true', () => {
    const { container } = render(
      <Countdown daysPadding={true} endTime={new Date().getTime() + 1000 * 60 * 60 * 24 * 3} />
    );
    expect(container).toHaveTextContent(/\d{2}天\d{2}时\d{2}分\d{2}秒/);
  });

  test('should trigger onEnd callback once when time over', () => {
    jest.useFakeTimers();
    const mockFn = jest.fn();
    const after = 3;

    render(<Countdown endTime={new Date().getTime() + 1000 * after} onEnd={mockFn} />);

    for (let i = 0; i < after - 1; i++) {
      jest.runOnlyPendingTimers();
    }

    expect(mockFn).not.toBeCalled();

    jest.runOnlyPendingTimers();

    expect(mockFn).toBeCalled();
  });
});
