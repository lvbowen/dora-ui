import React, { Component } from 'react';
import cx from 'classnames';
import warning from 'warning';
import { CountdownShape } from './interface';
import { withDefaultProps, isString, isNumber } from '../utils';

const defaultProps = {
  prefixCls: 'dora-countdown',
  wrapClassName: '',
  format: 'dd-天 hh-时 mm-分 ss-秒',
  padding: true,
  daysPadding: false
};

type DefaultProps = typeof defaultProps;
type Props = CountdownShape & DefaultProps;

class Countdown extends Component<Props, { ms: number }> {
  private beginTime = new Date().getTime();
  private interval = 1000;
  /** 计时器句柄 */
  private timeCounter: any = null;
  /** 计数器用于校正定时器偏差 */
  private count = 0;
  public constructor(props: Props) {
    super(props);
    this.state = {
      ms: 0
    };
  }

  public componentDidMount() {
    this.initCounter();
  }

  public componentDidUpdate(prevProps: Props) {
    const { endTime } = this.props;
    if (endTime !== prevProps.endTime) {
      this.initCounter();
    }
  }

  public componentWillUnmount() {
    clearTimeout(this.timeCounter);
  }

  private initCounter = () => {
    if (this.timeCounter) clearTimeout(this.timeCounter);
    const { endTime } = this.props;
    warning(isNumber(endTime), 'Props endTime must be a timestamp');
    const ms = endTime - this.beginTime;
    if (ms < 0) return;
    this.setState(
      {
        ms
      },
      () => {
        this.timeCounter = setTimeout(this.startCountDown, this.interval);
      }
    );
  };

  private startCountDown = () => {
    this.count++;
    const offset = new Date().getTime() - (this.beginTime + this.count * this.interval);
    // 误差校正
    let nextTime = this.interval - offset;
    if (nextTime < 0) {
      nextTime = 0;
    }
    this.setState({
      ms: Math.max(this.state.ms - this.interval, 0)
    });
    // console.log(
    //   `误差：${offset} ms，下一次执行：${nextTime} ms 后，离活动开始还有：${this.state.ms} ms`
    // );
    if (this.state.ms < 0) {
      clearTimeout(this.timeCounter);
    } else {
      this.timeCounter = setTimeout(this.startCountDown, nextTime);
    }
  };

  private padNumber = (mark: string, num: number) => {
    const { padding, daysPadding } = this.props;
    if (mark === 'dd' && !daysPadding) return num;
    if (padding) return num.toString().padStart(2, '0');
    return num;
  };

  // 毫秒 => 天 时 分 秒
  private get parseTime() {
    const { ms } = this.state;
    return {
      days: Math.floor(ms / (1000 * 60 * 60 * 24)),
      hours: Math.floor((ms / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((ms / (1000 * 60)) % 60),
      seconds: Math.floor((ms / 1000) % 60)
    };
  }

  // 天 时 分 秒 => 展示字符串
  private get formatTime() {
    const { format, prefixCls } = this.props;
    warning(isString(format), 'Props format must be a string');
    const { days, hours, minutes, seconds } = this.parseTime;
    const timeMap: { [key: string]: number } = {
      dd: days,
      hh: hours,
      mm: minutes,
      ss: seconds
    };
    return format.split(' ').map(item => {
      const [mark, unit = ''] = item.split('-');
      return (
        <span className={`${prefixCls}-time-block`} key={mark + unit}>
          <span className={`${prefixCls}-time`}>{this.padNumber(mark, timeMap[mark])}</span>
          <span className={`${prefixCls}-unit`}>{unit}</span>
        </span>
      );
    });
  }

  public render() {
    const { prefixCls, wrapClassName } = this.props;
    const rootCls = cx(prefixCls, wrapClassName);
    return <div className={rootCls}>{this.formatTime}</div>;
  }
}

export default withDefaultProps(defaultProps, Countdown);
