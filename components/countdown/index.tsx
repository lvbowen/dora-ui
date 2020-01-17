import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

export interface Props {
  endTime: number;
  onEnd?: (...args: any) => any;
  wrapClassName: string;
  prefixCls: string;
  format: string;
  padding: boolean;
  daysPadding: boolean;
}

class Countdown extends Component<Props, { ms: number }> {
  static propTypes = {
    endTime: PropTypes.number.isRequired,
    onEnd: PropTypes.func,
    prefixCls: PropTypes.string,
    wrapClassName: PropTypes.string,
    format: PropTypes.string,
    padding: PropTypes.bool,
    daysPadding: PropTypes.bool,
  };

  static defaultProps = {
    prefixCls: 'dora-countdown',
    wrapClassName: '',
    format: 'dd-天 hh-时 mm-分 ss-秒',
    padding: true,
    daysPadding: false,
  };

  beginTime = new Date().getTime();

  interval = 1000;

  /** 计时器句柄 */
  timeCounter: any = null;

  /** 计数器用于校正定时器偏差 */
  count = 0;

  constructor(props: Props) {
    super(props);
    this.state = {
      ms: 1,
    };
  }

  componentDidMount() {
    this.initCounter();
  }

  componentDidUpdate(prevProps: Props) {
    const { endTime } = this.props;
    if (endTime !== prevProps.endTime) {
      this.initCounter();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeCounter);
  }

  initCounter = () => {
    if (this.timeCounter) clearTimeout(this.timeCounter);
    const { endTime } = this.props;
    const ms = endTime - this.beginTime;
    if (ms < 0) return;
    this.setState(
      {
        ms,
      },
      () => {
        this.timeCounter = setTimeout(this.startCountDown, this.interval);
      },
    );
  };

  startCountDown = () => {
    const { ms } = this.state;
    const { onEnd } = this.props;

    this.count += 1;

    const offset = new Date().getTime() - (this.beginTime + this.count * this.interval);
    // 误差校正
    let nextTime = this.interval - offset;
    if (nextTime < 0) {
      nextTime = 0;
    }

    this.setState({
      ms: Math.max(ms - this.interval, 0),
    });
    // console.log(
    //   `误差：${offset} ms，下一次执行：${nextTime} ms 后，离活动开始还有：${this.state.ms} ms`
    // );

    if (this.state.ms <= 0) {
      clearTimeout(this.timeCounter);
      typeof onEnd === 'function' && onEnd();
    } else {
      this.timeCounter = setTimeout(this.startCountDown, nextTime);
    }
  };

  padNumber = (mark: string, num: number) => {
    const { padding, daysPadding } = this.props;
    if (mark === 'dd' && !daysPadding) return num;
    if (padding) return num.toString().padStart(2, '0');
    return num;
  };

  // 毫秒 => 天 时 分 秒
  get parseTime() {
    const { ms } = this.state;
    return {
      days: Math.floor(ms / (1000 * 60 * 60 * 24)),
      hours: Math.floor((ms / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((ms / (1000 * 60)) % 60),
      seconds: Math.floor((ms / 1000) % 60),
    };
  }

  // 天 时 分 秒 => 展示字符串
  get formatTime() {
    const { format, prefixCls } = this.props;
    const { days, hours, minutes, seconds } = this.parseTime;
    const timeMap: { [key: string]: number } = {
      dd: days,
      hh: hours,
      mm: minutes,
      ss: seconds,
    };
    return format.split(' ').map(item => {
      const [mark, unit = ''] = item.split('-');
      return (
        <span className={`${prefixCls}-time-block`} key={mark + unit}>
          <span className={`${prefixCls}-time`}>
            {String(this.padNumber(mark, timeMap[mark]))
              .split('')
              .map((s, i) => (
                /* eslint-disable-next-line react/no-array-index-key */
                <span key={i} className={`${prefixCls}-num`}>
                  {s}
                </span>
              ))}
          </span>
          <span className={`${prefixCls}-unit`}>{unit}</span>
        </span>
      );
    });
  }

  render() {
    const { prefixCls, wrapClassName } = this.props;
    const rootCls = cx(prefixCls, wrapClassName);
    return <div className={rootCls}>{this.formatTime}</div>;
  }
}

export default Countdown;
