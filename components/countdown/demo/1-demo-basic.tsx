import React from 'react';
import Countdown from 'dora-ui/lib/countdown';

export default () => <Countdown endTime={new Date().getTime() + 1000 * 60 * 60 * 24 * 3} />;
