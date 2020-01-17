/* eslint-disable no-alert */
import React from 'react';
import Countdown from '../index';

export default () => (
  <Countdown
    format="dd-天 hh-h mm-分 ss-s"
    daysPadding
    endTime={new Date().getTime() + 1000 * 30}
    onEnd={() => {
      alert('倒计时结束啦');
    }}
  />
);
