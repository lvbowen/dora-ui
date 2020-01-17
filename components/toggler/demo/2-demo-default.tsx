import React from 'react';
import { Button } from 'antd';
import Toggler from '..';

export default () => (
  <Toggler defaultToggled>
    {([toggled, onToggle]) => <Button onClick={() => onToggle()}>{toggled ? 'ON' : 'OFF'}</Button>}
  </Toggler>
);
