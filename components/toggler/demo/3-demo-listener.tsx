import React from 'react';
import Toggler from 'dora-ui/lib/toggler';

import { Button } from 'antd';

export default () => (
  <Toggler afterToggled={(toggled: boolean) => console.log(toggled)}>
    {([toggled, onToggle]) => <Button onClick={() => onToggle()}>{toggled ? 'ON' : 'OFF'}</Button>}
  </Toggler>
);
