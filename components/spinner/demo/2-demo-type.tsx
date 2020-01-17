import React from 'react';
import Spinner from '..';
import '../style';

export default () => (
  <div
    style={{
      background: 'rgba(255, 255, 255, 0.35)',
      height: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Spinner type="wave" size="sm" />
  </div>
);
