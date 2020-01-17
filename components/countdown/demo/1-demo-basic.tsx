import React from 'react';
import Countdown from '../index';

export default () => <Countdown endTime={new Date().getTime() + 1000 * 60 * 60 * 24 * 3} />;
