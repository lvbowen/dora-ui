import React from 'react';
import Spinner from '..';
import '../style';

export default () => (
  <div
    style={{
      background: 'rgba(0, 0, 0, 0.7)',
      height: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Spinner />
  </div>
);
