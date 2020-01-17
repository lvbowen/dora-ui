import React from 'react';
import { Button } from 'antd';
import Toggler from '..';

export default () => (
  /* eslint-disable-next-line no-console */
  <Toggler afterToggled={(toggled: boolean) => console.log(toggled)}>
    {([toggled, onToggle]) => <Button onClick={() => onToggle()}>{toggled ? 'ON' : 'OFF'}</Button>}
  </Toggler>
);
